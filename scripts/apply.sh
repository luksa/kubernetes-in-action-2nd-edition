#!/usr/bin/env bash
DIR="$(cd $(dirname $0) ; pwd -P)"

source "${DIR}/replace.sh"

replace apply "${@}"
