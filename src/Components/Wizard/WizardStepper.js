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
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Player count', 'Playtime', 'Theme'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Player count';
    case 1:
      return 'Playtime';
    case 2:
      return 'Theme';
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  };

  const handleReset = () => {
    setActiveStep(0)
  };

  const playerCountOptions = [
    'solo',
    'duo',
    '2-4',
    '4',
  ]

  const playTimeOptions = [
    '30min',
    'max 1h',
    'max 2h',
    'We got all night',
  ]

  const themeOptions = [
    'Fantasy',
    'Horror',
    'Sci-fi',
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
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            {activeStep === 0 &&
              <div className="step-playercount">
                <h2>Going solo, duo or with a group?</h2>
                <WizardOptions options={playerCountOptions} />
              </div>
            }
            {activeStep === 1 &&
              <div className="step-playtime">
                <h2>A quick round or full gaming night?</h2>
                <WizardOptions options={playTimeOptions} />
              </div>
            }
            {activeStep === 2 &&
              <div className="step-theme">
                <h2>Theme party!</h2>
                <WizardOptions options={themeOptions} />
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