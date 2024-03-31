import {Card,CardContent, Typography } from "@mui/material"

const Cards = () => {
  return (
  <>
      <div style={{display:"flex",justifyContent:"center",gap:"1.5vw",flexWrap:"wrap"}}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Card 1
            </Typography>
            <Typography variant="body2">
              This is a description for card 1.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Card 2
            </Typography>
            <Typography variant="body2">
              This is a description for card 2.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Card 3
            </Typography>
            <Typography variant="body2">
              This is a description for card 3.
            </Typography>
          </CardContent>
        </Card>
      </div>
  </>
  )
}

export default Cards