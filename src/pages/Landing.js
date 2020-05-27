import React from 'react';
import styles from '../scss/landingstyles.css';
import {NavLink} from 'react-router-dom';

const Landing = () => {
	return (
		<div className="landingpage">
			    <header className="emotionfy">
        <div className="text-emotionfy">    
            <img src={require("../assets/img/brand/logo.svg")}/>
            <p>Puedes subir imágenes o videos para ser analizados por un modelo de machine learning y obtener los niveles de emociones que hay en cada momento.</p>
            <NavLink to= "/login" className="button">Get Started</NavLink>
            {/* <a href="#" className="button">Get started</a> */}
        </div>
        {/* <div style="height: 150px; overflow: hidden;" ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill: #fff;"></path></svg></div>   */}
    </header>
    <section className="price-comparison">
        <div className="price-column">
          <div className="price-header">
            <div className="price">
              <div className="dollar-sign">$</div>
              10
              <div className="per-month">/mo</div>
            </div>
            <div className="plan-name">Basic</div>
          </div>
          <div className="divider"></div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature A
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature B
          </div>
          <div className="feature inactive">
            <img src={require("../assets/img/icons/x-square.svg")}/>
            Feature C
          </div>
          <div className="feature inactive">
            <img src={require("../assets/img/icons/x-square.svg")}/>
            Feature D
          </div>
          <div className="feature inactive">
            <img src={require("../assets/img/icons/x-square.svg")}/>
            Feature E
          </div>
          <div className="feature inactive">
            <img src={require("../assets/img/icons/x-square.svg")}/>
            Feature F
          </div>
          <button className="cta">Start Today</button>
        </div>
        <div className="price-column popular">
          <div className="most-popular">Most Popular</div>
          <div className="price-header">
            <div className="price">
              <div className="dollar-sign">$</div>
              20
              <div className="per-month">/mo</div>
            </div>
            <div className="plan-name">Professional</div>
          </div>
          <div className="divider"></div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature A
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature B
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature C
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature D
          </div>
          <div className="feature inactive">
            <img src={require("../assets/img/icons/x-square.svg")}/>
            Feature E
          </div>
          <div className="feature inactive">
            <img src={require("../assets/img/icons/x-square.svg")}/>
            Feature F
          </div>
          <button className="cta">Start Today</button>
        </div>
        <div className="price-column">
          <div className="price-header">
            <div className="price">
              <div className="dollar-sign">$</div>
              50
              <div className="per-month">/mo</div>
            </div>
            <div className="plan-name">Enterprise</div>
          </div>
          <div className="divider"></div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature A
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature B
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature C
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature D
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature E
          </div>
          <div className="feature">
            <img src={require("../assets/img/icons/check-circle.svg")}/>
            Feature F
          </div>
          <button className="cta">Start Today</button>
        </div>
      </section>	
		</div>
	);
};


export default Landing;