#!/usr/bin/env bash
egrep -R "\_\(" www | cut -f2 -d\( | cut -f1 -d\) | sort | uniq
