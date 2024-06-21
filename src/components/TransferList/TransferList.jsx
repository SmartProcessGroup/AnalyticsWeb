import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { Divider, Typography } from "@mui/material";

TransferList.propTypes = {
  onChange: PropTypes.func.isRequired,
  leftListTitle: PropTypes.string.isRequired,
  rightListTitle: PropTypes.string.isRequired,
  leftList: PropTypes.array.isRequired,
  rightList: PropTypes.array.isRequired,
};

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({
  onChange,
  leftListTitle,
  rightListTitle,
  leftList,
  rightList,
}) {
  const [checked, setChecked] = React.useState([]);
  const [selectedList, setSelectedList] = React.useState({
    left: leftList || [],
    right: rightList || [],
  });

  const leftChecked = intersection(checked, selectedList.left);
  const rightChecked = intersection(checked, selectedList.right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setSelectedList((prevState) => ({
      ...prevState,
      right: selectedList.right.concat(selectedList.left),
      left: [],
    }));
    onChange({
      right: selectedList.right.concat(selectedList.left),
      left: [],
    });
  };

  const handleCheckedRight = () => {
    setSelectedList((prevState) => ({
      ...prevState,
      right: selectedList.right.concat(leftChecked),
      left: not(selectedList.left, leftChecked),
    }));
    // setRight(right.concat(leftChecked));
    // setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    onChange({
      right: selectedList.right.concat(leftChecked),
      left: not(selectedList.left, leftChecked),
    });
  };

  const handleCheckedLeft = () => {
    setSelectedList((prevState) => ({
      ...prevState,
      left: selectedList.left.concat(rightChecked),
      right: not(selectedList.right, rightChecked),
    }));
    // setLeft(left.concat(rightChecked));
    // setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    onChange({
      left: selectedList.left.concat(rightChecked),
      right: not(selectedList.right, rightChecked),
    });
  };

  const handleAllLeft = () => {
    setSelectedList((prevState) => ({
      ...prevState,
      left: selectedList.left.concat(selectedList.right),
      right: [],
    }));
    // setLeft(left.concat(right));
    // setRight([]);
    onChange({
      left: selectedList.left.concat(selectedList.right),
      right: [],
    });
  };

  const customList = (items, title) => (
    <>
      <Typography align="center" variant="body1">
        {title}
      </Typography>
      <Divider
        sx={{
          mb: 1,
        }}
      />
      <Paper elevation={3} sx={{ width: 300, height: 300, overflow: "auto" }}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value.value}-label`;

            return (
              <ListItemButton
                key={value.value}
                role="listitem"
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    </>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(selectedList.left, leftListTitle)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={selectedList.left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={selectedList.right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(selectedList.right, rightListTitle)}</Grid>
    </Grid>
  );
}
