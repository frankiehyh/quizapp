import React from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";
import data from "./data.js";

function Results({ results }) {
  let sideText;
  let mainTrait;
  let personalityText;
  let youAre = "You are: ";
  let personality = [];
  let sortedResults = Object.fromEntries(
    Object.entries(results).sort(([, a], [, b]) => b - a)
  );
  let sideTrait = Object.entries(sortedResults)[1][0];
  switch (sideTrait) {
    case "A":
      sideTrait = "Romantic";
      break;
    case "B":
      sideTrait = "Classic";
      break;
    case "C":
      sideTrait = "Sartorial";
      break;
    case "D":
      sideTrait = "Natural";
      break;
    default:
      throw new Error();
  }
  for (let [key, value] of Object.entries(sortedResults)) {
    switch (key) {
      case "A":
        key = "Romantic";
        break;
      case "B":
        key = "Classic";
        break;
      case "C":
        key = "Sartorial";
        break;
      case "D":
        key = "Natural";
        break;
      default:
        throw new Error();
    }
    let percentage = +((value / data.length) * 100).toFixed(0);
    if (personality.length === 0) {
      mainTrait = key;
    }
    if (percentage === 0) {
      continue;
    }
    personality.push(`${percentage}% ${key}`);
    switch (mainTrait) {
      case "Romantic":
        personalityText =
          "You have a Romantic personality. Expressive, often showcasing your personality\
        through the lens of your clothings. There is no one favourite color as your dressing\
        style differs with your mood.";
        break;
      case "Classic":
        personalityText =
          "You are a Classic personality who dresses himself well and according to\
        social conventions. You follow the rules but you dress well with flair, making a white shirt and\
        a navy trousers look good.";
        break;
      case "Sartorial":
        personalityText =
          "You have a Sartorial personality. You are often dressed sharply, with attention to details. Your clothing choices\
          reflect your inner confidence.";
        break;
      case "Natural":
        personalityText =
          "You have a Natural personality. You favor colors that goes well with each other, typically earthy tones as\
        they showcase the simplicity of your dresing.";
        break;
      default:
        throw new Error();
    }
    switch (sideTrait) {
      case "Romantic":
        sideText =
          " You are also an expressive romantic, often showcasing your personality\
        through the lens of your clothings. There is no one favourite color of yours, as your dressing\
        style differs with your mood.";
        break;
      case "Classic":
        sideText =
          " Also, you are a classic person who dresses himself well and according to\
        social conventions. Your favourite colors are white and navy, as they are the essential colors of\
        a gentleman's wardrobe.";
        break;
      case "Sartorial":
        sideText =
          " Also, your sartorial style means that you are often dressed sharply, and pay meticulous attention to details.\
          When it comes to your dressing style, colors like brown and light grey with patterns like Prince-of-Wales check\
          are often found in your wardrobe.";
        break;
      case "Natural":
        sideText =
          " Also,your natural side favor colors that goes well with each other, typically earthy tones as\
        they showcase the simplicity of your dressing style, such as khaki, green and sand. Occasionaly, linen\
        shirts can be found within your wardrobe.";
        break;
      default:
        throw new Error();
    }
  }
  const personalityResult = personality.map((results) => <p>{results}</p>);
  return (
    <div className="results">
      <h3>{youAre}</h3>
      <b className="personalityResults">{personalityResult}</b>
      <p>
        Your main personality is <b>{mainTrait}</b>, and your secondary
        personality is <b>{sideTrait}</b>.
      </p>
      <p className="personalityText">
        {personalityText}

        {sideText}
      </p>
      <br />
      <br />
      <FacebookShareButton
        className="fbShare"
        url={"https://quiz.cyctailor.com"}
        quote={`My personality is ${mainTrait}! Find out yours with CYC!`}
      >
        <FacebookIcon size={32} round />
        <p>Share on Facebook</p>
      </FacebookShareButton>
      <WhatsappShareButton
        className="waShare"
        title={"Find out your personality with CYC: "}
        url={"https://quiz.cyctailor.com"}
        separator={" "}
      >
        <WhatsappIcon size={32} round />
        <p>Share on WhatsApp</p>
      </WhatsappShareButton>
    </div>
  );
}

export default Results;
