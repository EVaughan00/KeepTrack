#!/bin/bash

while read contents;
do
	if [ $contents == 'S A L E S  A N D  T A X E S' ]
	then
		echo "$contents"
	fi
done < ./20065_03102019_AllSalesReport.txt
