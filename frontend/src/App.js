import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {

  const initialFormState = {
  
      gender: "",
      senior: "",
      partner: "",
      dependents: "",
      tenure: "",
      phone: "",
      monthlyCharges: "",
      totalCharges: ""
};

  const [formData, setFormData] =
    useState({

      gender: "",
      senior: "",
      partner: "",
      dependents: "",
      tenure: "",
      phone: "",
      monthlyCharges: "",
      totalCharges: ""
    });

  const [result, setResult] =
    useState("");

  const [confidence,
    setConfidence] =
    useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response =
      await axios.post(
        "http://127.0.0.1:8000/api/churn/predict",
        formData
      );

    console.log(response.data);

    setResult(
      response.data.data.prediction
    );

    setConfidence(
      response.data.data.confidence
    );

  } catch (error) {

    console.log(error);

    alert("Prediction Failed");
  }
};


// Refresh / Clear
  const handleRefresh = () => {
    setFormData(initialFormState);

    setResult("");
    setConfidence("");
  };


  useEffect(() => {
  gsap.from(".churntitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".churntitle",
      start: "top 32%",
     
      scrub: true,
      
    }
  });
  
}, []);


  useEffect(() => {
gsap.from(".card", {
    y: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".cards",
      start: "top 97%",
      end : "top 70%",
      markers: true,
      scrub: true,
    }
  });
  }, []);


  return (
    <>

   <div className="homepage">
      <h1 className="churntitle">Churn!Q</h1>

      <h3>AI-Powered Analytics</h3>
      <h2 className="predict">Predict Customer Churn</h2>
      <h2 className="before">Before It Happens</h2>
    </div> 


    <div className="process">
      <h1 className="process-title">How Churn!Q works</h1>
      <p className="process-description">Three simple steps from raw customer data to actionable retention insights powered by Neuron networks.</p>

      <section class="steps-section">

    <div class="card">
        <h1>01</h1>
        <h3>Enter customer data</h3>
        <p>
            Fill in the customer profile — contract details,
            usage patterns, tenure, and billing info.
        </p>
    </div>

    <div class="card middle-card">
        <h1>02</h1>
        <h3>Model analyzes risk</h3>
        <p>
            Our Neuron Network model evaluates 18+
            behavioural and demographic signals simultaneously.
        </p>

        
    </div>

    <div class="card">
        <h1>03</h1>
        <h3>Get actionable insight</h3>
        <p>
            Receive a churn probability score with key
            risk factors and recommended retention actions.
        </p>
    </div>

</section>
    </div>

    {/* <div className="image" >
hello
    </div> */}
       

    <div className="container">

      <div className="head">
        <div className="brain"></div>
    
      </div>

      <div className="text">

      <h1 className="title">
        Customer Churn Prediction
        
      </h1>
      <p>Fill in all the details to detect ai powered customer churn prediction and insights.</p>
</div>

     <form onSubmit={handleSubmit} className="churn-form">

  <div className="form-grid">

    {/* LEFT SIDE */}
    <div className="left-section">

      <div className="form-group">
        <select
          name="gender"
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <select
          name="senior"
          onChange={handleChange}
          required
        >
          <option value="">
            Senior Citizen
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <select
          name="partner"
          onChange={handleChange}
          required
        >
          <option value="">
            Partner
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <select
          name="dependents"
          onChange={handleChange}
          required
        >
          <option value="">
            Dependents
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="right-section">

      <div className="form-group">
        <input
          type="number"
          name="tenure"
          placeholder="Tenure (months)"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <select
          name="phone"
          onChange={handleChange}
          required
        >
          <option value="">
            Phone Service
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="number"
          name="monthlyCharges"
          placeholder="Monthly Charges"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          name="totalCharges"
          placeholder="Total Charges"
          onChange={handleChange}
          required
        />
      </div>

    </div>

  </div>

  <button type="submit">
    Run Prediction
  </button>

</form>


      {
        result && (

          <div className="result-box">
        

            <h2 className="result-text" >
               {result}
            </h2>


            <h3 className="confidence" >
               Confidence:
              {" "}
              {confidence}%
           </h3>

            
          </div>
        )
      }

    </div>
    </>
  );
}

export default App;