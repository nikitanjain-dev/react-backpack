import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  let roomData = [{ name: 'Advisory Board', id: 1, type:0  },
  { name: 'Audit', id: 2, type:1 },
  { name: 'Communication', id: 3 ,type:1},
  { name: 'Digital', id: 4,type:1 },
  { name: 'Finance', id: 5 ,type:1},
  { name: 'Financial Expert', id: 6,type:1 },
  { name: 'Human Ressources', id: 7,type:1 },
  { name: 'IT', id: 8,type:1},
  { name: 'Legal', id: 9,type:1 },
  { name: 'Marketing', id: 10,type:1 },
  { name: 'Operations', id: 11,type:1 },
  { name: 'Relationship Management', id: 12,type:1 },
  { name: 'Representation of Employees', id: 13,type:1 },
  { name: 'Risk & Compliance', id: 14 ,type:1},
  { name: 'Sustainability', id: 15,type:1 }];

  return (
    <Box sx={{ flexGrow: 1,
      padding: {
      xs: '20px 20px',
      sm: '20px 20px',
      md: '20px 20px',
      lg: '20px 20px',
      xl: '0px 20px'
  } 
  }}>
  <Grid container spacing={2}>
            {roomData.map(room => 
                <Grid item key={room} xs ={room.type == 0 ? 12:4}>
                  <Item>{room.name}</Item>
                </Grid>
            )}
          </Grid>
          <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button
  onClick={() => {
    var m = window.BridgeApi?.showWelcomeScreen();
    console.log(m);
    // Android.onClicked();
    // window.open('https://reactjs.org', '_blank');
  }}
>
  Click me to call native android function
</Button>
    </Box>
  );
}

export default App;
