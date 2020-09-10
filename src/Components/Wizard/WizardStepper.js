import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import WizardOptions from './WizardOptions'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '50px 0'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  finishScreen: {
    textAlign: 'center',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  wizardOptions: {
    textAlign: 'center',
    margin: '50px 0'
  },
  stepOptions: {
    margin: '50px 0',
  },
}));

function getSteps() {
  return ['Player count', 'Playtime', 'Theme'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Lone wolf or got a group?';
    case 1:
      return 'A quick round or full gaming night?';
    case 2:
      return 'Theme party!';
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const [playerCount, setPlayerCount] = React.useState(0)
  const [playTime, setPlayTime] = React.useState(0)
  const [theme, setTheme] = React.useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    if (activeStep + 1 === steps.length) {
      props.onFinish(playerCount, playTime, theme)
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  };

  const handleReset = () => {
    setActiveStep(0)
  };

  const updatePlayerCount = (label, value) => {
    setPlayerCount(value)
  }

  const updatePlayTime = (label, value) => {
    setPlayTime(value)
  }

  const updateTheme = (label, value) => {
    setTheme(value)
  }

  const playerCountOptions = [
    {
      'label': 'Solo',
      'value': 1
    },
    {
      'label': 'Duo',
      'value': 2
    },
    {
      'label': '2-4',
      'value': 3
    },
    {
      'label': '4+',
      'value': 4
    },
  ]

  const playTimeOptions = [
    {
      'label': '10min',
      'value': 10
    },
    {
      'label': '1 hour',
      'value': 60
    },
    {
      'label': '2 hour',
      'value': 120
    },
    {
      'label': 'Got all night',
      'value': 9999
    },
  ]

  const themeOptions = [
    {
      'label': 'Fantasy',
      'value': 'ZTneo8TaIO'
    },
    {
      'label': 'Horror',
      'value': 'cAIkk5aLdQ'
    },
    {
      'label': 'Sci-fi',
      'value': '3B3QpKvXD3'
    },
    {
      'label': 'Strategy',
      'value': 'O0ogzwLUe8'
    },
  ]

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.finishScreen}>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
          </div>
        ) : (
          <div className={classes.wizardOptions}>
            <Typography className={classes.instructions} variant="h3" component="h1">{getStepContent(activeStep)}</Typography>
            {activeStep === 0 &&
              <div className={classes.stepOptions}>
                <WizardOptions step="playerCount" onSelect={updatePlayerCount} options={playerCountOptions} />
              </div>
            }
            {activeStep === 1 &&
              <div className={classes.stepOptions}>
                <WizardOptions step="playTime" onSelect={updatePlayTime} options={playTimeOptions} />
              </div>
            }
            {activeStep === 2 &&
              <div className={classes.stepOptions}>
                <WizardOptions step="theme" onSelect={updateTheme} options={themeOptions} />
              </div>
            }
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}