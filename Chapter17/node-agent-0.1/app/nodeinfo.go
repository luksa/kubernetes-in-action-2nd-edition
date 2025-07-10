package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
	"time"
)

type NodeInfo struct {
}

func NewNodeInfo() NodeInfo {
	return NodeInfo{}
}

func (ni *NodeInfo) Uptime() (time.Duration, error) {
	s, err := ioutil.ReadFile("/proc/uptime")
	if err != nil {
		return 0, fmt.Errorf("Could not read /proc/uptime: %v", err)
	}

	data := strings.Fields(string(s))
	if len(data) == 0 {
		return 0, fmt.Errorf("No data found in /proc/uptime")
	}

	uptime, err := strconv.ParseFloat(data[0], 64)
	if err != nil {
		return 0, fmt.Errorf("Could not parse uptime as float64")
	}

	return time.Duration(uptime) * time.Second, nil
}

func (ni *NodeInfo) LoadAverage() (string, error) {
	s, err := ioutil.ReadFile("/proc/loadavg")
	if err != nil {
		return "", fmt.Errorf("Could not read /proc/loadavg: %v", err)
	}

	data := strings.Fields(string(s))
	if len(data) < 4 {
		return "", fmt.Errorf("Invalid data found in /proc/loadavg")
	}

	return fmt.Sprintf("%s, %s, %s, active/total threads: %s",
		data[0], data[1], data[2], data[3]), nil
}
