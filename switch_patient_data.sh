#!/bin/bash

# Function to display usage
show_usage() {
    echo "Usage: ./switch_patient_data.sh [sample|empty]"
    echo "  sample - Switch to sample patient data"
    echo "  empty  - Switch to empty patient data"
}

# Check if argument is provided
if [ $# -ne 1 ]; then
    show_usage
    exit 1
fi

# Remove existing symlink if it exists
if [ -L "patient_data" ]; then
    rm patient_data
fi

# Create new symlink based on argument
case "$1" in
    "sample")
        ln -s sample_patient_data patient_data
        echo "Switched to sample patient data"
        ;;
    "empty")
        ln -s empty_patient_data patient_data
        echo "Switched to empty patient data"
        ;;
    *)
        show_usage
        exit 1
        ;;
esac 
