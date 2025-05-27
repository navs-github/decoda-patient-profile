# Decoda Patient Profile

## Switching Between Sample and Empty Patient Data

This project supports easily swapping between a populated sample dataset and an empty dataset for testing empty states.

### How it works

A symlink named `patient_data` points to either the `sample_patient_data` or `empty_patient_data` directory. The app always loads data from the `patient_data` symlink.

### Switching datasets

Use the provided script to switch between datasets:

```bash
# To use the sample (populated) data:
./switch_patient_data.sh sample

# To use the empty data:
./switch_patient_data.sh empty
```

After running the script, the symlink will point to the selected dataset. You may need to refresh your app in the browser to see the changes.

### Why use this?
- Quickly test how your app handles both real and empty data
- No need to manually copy or rename files

If you have any issues, make sure the script is executable (`chmod +x switch_patient_data.sh`).
