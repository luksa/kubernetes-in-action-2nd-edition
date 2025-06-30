#!/bin/sh

echo "[traffic-meter] Starting traffic meter..."

INTERFACE="eth0"

# Get initial byte counts
read rx1 tx1 < <(awk -v iface="$INTERFACE" '$1 ~ iface":" {print $2, $10}' /proc/net/dev)

while true; do
  sleep 10

  read rx2 tx2 < <(awk -v iface="$INTERFACE" '$1 ~ iface":" {print $2, $10}' /proc/net/dev)

  rx_diff=$((rx2 - rx1))
  tx_diff=$((tx2 - tx1))

  echo "[traffic-meter] Inbound: $rx_diff bytes, Outbound: $tx_diff bytes (last 10s)"

  rx1=$rx2
  tx1=$tx2
done