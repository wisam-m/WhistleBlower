import React, { Component } from "react";
import { getlogo } from "./getlogo";
import { withRouter } from "react-router-dom";
import Webcam from "react-webcam";
import { Step, Box, Stepper, StepLabel, Button, Typography } from '@mui/material';
import { verify } from "./verify";
import { Link } from "react-router-dom";

class GetTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      step: 0,
      idImage: null,
      logo: null,
      selfieImage: null,
      match: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.captureID = this.captureID.bind(this);
    this.captureSelfie = this.captureSelfie.bind(this);
    this.getLogo = this.getLogo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleNext() {
    this.setState({
      step: this.state.step + 1
    });
  }

  handleBack() {
    this.setState({
      step: this.state.step - 1
    });
  }

  setRef = webcam => {
    this.webcam = webcam;
  }

  captureID () {
    this.setState({
      idImage: this.webcam.getScreenshot()
    });
  }

  captureSelfie () {
    this.setState({
      selfieImage: this.webcam.getScreenshot()
    });
  }

  getLogo () {
    getlogo(this.state.idImage).then((data) => {
      if (data.errors && data.errors.length > 0) {
        this.setState({
          error: data.errors[0].message,
          logo: null
        });
      }
      else {
        this.setState({
          error: null,
          logo: data.data.Identify
        });
      }
    });
  }

  handleSubmit () {
    if (this.state.idImage && this.state.selfieImage) {
      verify(this.state.idImage, this.state.selfieImage).then((data) => {
        if (data.errors && data.errors.length > 0) {
          this.setState({
            error: data.errors[0].message,
            match: null
          });
        } else {
          this.setState({
            error: null,
            match: data.data.Verify,
            step: this.state.step + 1
          });
        }
      });
    }
  }

  render() {
    // source: https://www.npmjs.com/package/react-webcam
    return (
      <Box sx={{ width: '100%'}}>
        <Stepper activeStep={this.state.step} alternativeLabel>
          <Step>
            <StepLabel>ID Photo</StepLabel>
          </Step>
          <Step>
            <StepLabel>Selfie</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>
        {(this.state.logo && this.state.match) ? (<React.Fragment>
            <Typography>Thanks for verifying, you had a similarity of {this.state.match}% with your ID!</Typography>
            <Typography>The tag "{this.state.logo}" will be added to your account</Typography>
            <Link to="/">
              <Button>Go to home</Button>
            </Link>
          </React.Fragment>)
        :(<React.Fragment>
            {/* source: https://mui.com/components/steppers/ */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Webcam
                audio={false}
                height={360}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={720} />
              {this.state.step === 0 ? (
                <><Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                  <Typography>
                    Take a photo of your ID
                  </Typography>
                  {this.state.idImage && (
                    <div>
                      <img src={this.state.idImage} alt="" height={200} />
                      <Button onClick={this.getLogo}>Use</Button>
                      {this.state.logo && (<Typography>{this.state.logo}</Typography>)}
                    </div>
                  )}
                  {this.state.error != null && <Typography>{this.state.error}</Typography>}
                </Box></>
              ) :
              (
                <><Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                  <Typography>
                    Take a photo of yourself
                  </Typography>
                  {this.state.selfieImage && (
                    <div>
                      <img src={this.state.selfieImage} alt="" height={200} />
                    </div>
                  )}
                  {this.state.error != null && <Typography>{this.state.error}</Typography>}
                </Box></>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={this.state.step === 0}
                onClick={this.handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={(this.state.step === 0) ? this.captureID : this.captureSelfie}>Capture photo</Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {this.state.step === 0 ? 
                <Button onClick={this.handleNext} disabled={!this.state.logo || this.state.error}>Next</Button> : 
                <Button onClick={this.handleSubmit} disabled={!this.state.selfieImage || !this.state.idImage}>Submit</Button>}
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
  }
}

export default withRouter(GetTags);