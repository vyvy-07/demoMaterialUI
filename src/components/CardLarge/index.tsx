import { Button, Card, CardActions, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

export const CardLarge = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: 'transperent',
        position: 'relative',
      }}
    >
      <div className="absolute w-full h-full ">
        <img
          className="absolute w-full h-full -z-10"
          src="./banner.jpg"
          alt="banner"
        />
      </div>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />a benevolent smile
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
export default CardLarge;
