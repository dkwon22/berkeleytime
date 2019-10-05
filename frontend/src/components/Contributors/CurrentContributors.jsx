import React from 'react';
import FontAwesome from 'react-fontawesome';

import leon from "../../assets/img/images/about/leon.jpg";
import will from "../../assets/img/images/about/will.jpg";
import michael from "../../assets/img/images/about/michael.jpg";
import jemma from "../../assets/img/images/about/jemma.jpg";
import richard from "../../assets/img/images/about/richard.jpg";
import anson from "../../assets/img/images/about/anson.jpg";
import chris from "../../assets/img/images/about/chris.jpg";
import eli from "../../assets/img/images/about/eli.jpg";
import evelyn from "../../assets/img/images/about/evelyn.jpg";
import grace from "../../assets/img/images/about/grace.jpg";
import sangbin from "../../assets/img/images/about/sang.jpg";
import mary from '../../assets/img/images/about/mary.jpg';
import chloe from '../../assets/img/images/about/chloe.jpeg';
import izzie from '../../assets/img/images/about/izzie.jpg';
import janet from '../../assets/img/images/about/janet.jpg';
import annie from '../../assets/img/images/about/annie.png';
import oski from "../../assets/img/images/about/oski.jpg";

function CurrentContributors({ contributors }) {
  return (
    <section className="contributors">
      <div className="contributors-container">
          <div className="contributors-description">
              <h4>Meet our Team</h4>
              <p>We are a group of dedicated Berkeley students committed to making Berkeley a little smaller for everyone.</p>
          </div>

          <div className="contributor-profiles">
                  {contributors.map((member, idx) => (
                      <div className="contributor-card">
                        <div className="contributor-pic-container">
                          <img className="contributor-pic" src={member.image}></img>
                        </div>
                        <div className="contributor-desc">
                          <a href={member.site}><h5 className="contributor-name">{member.name}</h5></a>
                          <p className="contributor-role">{member.role}</p>
                        </div>
                      </div>
                  ))}
          </div>
      </div>
  </section>
);
}

CurrentContributors.defaultProps = {
  contributors: [
    { name: "Leon Ming",
      role: "ASUC CTO",
      image: leon,
      site: "https://leon-ming.com",
    },
    { name: "Michael Li",
      role: "Product Manager",
      image: michael,
      site: "http://www.michaelli.me",
    },
    { name: "Will Wang",
      role: "Advisor",
      image: will,
      site: "http://www.hantaowang.me",
    },
    { name: "Richard Liu",
      role: "Advisor",
      image: richard,
      site: "https://www.linkedin.com/in/richard4912",
    },
    { name: "Jemma Kwak",
      role: "Design Lead",
      image: jemma,
      site: "https://jemmakwak.github.io",
    },
    { name: "Christopher Liu",
      role: "Frontend Lead",
      image: chris,
      site: "https://www.linkedin.com/in/christopher-d-liu/",
    },
    { name: "Sangbin Cho",
      role: "Backend Lead",
      image: sangbin,
      site: "https://www.linkedin.com/in/sang-cho/",
    },
    { name: "Anson Tsai",
      role: "Backend Engineering",
      image: anson,
      site: "https://www.linkedin.com/in/anson-tsai-83b9a312a/",
    },
    { name: "Eli Wu",
      role: "Backend Engineering",
      image: eli,
    },
    { name: "Evelyn Li",
      role: "Backend Engineering",
      image: evelyn,
      site: "https://www.linkedin.com/in/yunqil/",
    },
    { name: "Grace Luo",
      role: "Frontend Engineering",
      image: grace,
      site: "http://graceluo.me",
    },
    { name: "Sean Meng",
      role: "Backend Engineering",
      image: oski,
    },
    { name: "Mary Liu",
      role: "Backend Engineering",
      image: mary,
    },
    { name: "Hannah Yan",
      role: "Backend Engineering",
      image: oski,
    },
    { name: "Isabella Lau",
      role: "Backend Engineering",
      image: izzie,
    },
    { name: "Christina Shao",
      role: "Frontend Engineering",
      image: oski,
    },
    { name: "Chloe Liu",
      role: "Frontend Engineering",
      image: chloe,
    },
    { name: "Janet Xu",
      role: "Designer",
      image: janet,
    },
    { name: "Annie Pan",
      role: "Designer",
      image: annie,
    },
  ],
};

export default CurrentContributors;