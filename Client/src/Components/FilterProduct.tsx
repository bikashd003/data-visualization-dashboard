import { Select, MenuItem, Typography } from "@mui/material";
import { useContext } from "react";
import { DataContext, DataContextType } from "../Context/ContextStore";

const FilterProduct: React.FC = () => {
  const context = useContext(DataContext) as DataContextType;
  const { setSortingCriteria,sortingCriteria } = context;

  const handleSortChange = (event:any) => {
    const selectedCriteria = event.target.value as string;
    setSortingCriteria(selectedCriteria);
  
  };

  return (
    <>
     <Typography variant="h5" component="div">
              Sort by:
            </Typography>
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleSortChange}
        value={sortingCriteria}
        sx={{marginBottom:"0.5vw"}}
      >
        <MenuItem value="relevance">Relevance</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
        <MenuItem value="lowToHigh">Price -- Low to High</MenuItem>
        <MenuItem value="highToLow">Price -- High to Low</MenuItem>
      </Select>
    </>
  );
};

export default FilterProduct;
