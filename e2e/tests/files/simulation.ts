import {Given, When, Then, setDefaultTimeout, After, Status} from "@cucumber/cucumber";
import * as fs from 'fs';
import { exec } from "child_process";
import * as path from 'path';
import axios from 'axios';
import * as gtts from 'google-tts-api'
import ffmpeg = require('fluent-ffmpeg');
import { getPage } from "../../corelib/corelib.spec";

const outputFilePath = path.join(__dirname, '../output.mp3');
const wavFilePath = path.join(__dirname, '../output.wav');
let responsetxt: string | string[] = [];
let userInputs: string | string[] = [];
let data: any[] =[];

async function getSemanticSimilarity(sentence1: string, sentence2: string) {

   const apiKey = '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'; // Replace with your Hugging Face API key
   const model = 'sentence-transformers/paraphrase-MiniLM-L6-v2';
   const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ inputs: { source_sentence: sentence1, target_sentence: sentence2 } })
   });
  
   const result = await response.json();
   const similarity = result.score;
  
   if (similarity > 0.8) return 'similar';
   else if (similarity > 0.5) return 'mostly similar';
   return 'not similar';
}


async function convertToAudio(textToConvert: string){

   const url = gtts.getAudioUrl(textToConvert, { lang: 'en', slow: false, host: 'https://translate.google.com' });
   const response = await axios.get(url, { responseType: 'arraybuffer' });
   fs.writeFileSync(outputFilePath, Buffer.from(response.data));

   await new Promise((resolve, reject) => {
      ffmpeg(outputFilePath)
      .outputOptions('-loglevel', 'error') // Suppress logs
      .toFormat('wav')
      .on('end', resolve)
      .on('error', reject)
      .save(wavFilePath);
   });

}
  
function playAudio(filePath: string) {
   exec(`ffplay -nodisp -autoexit "${filePath}"`, (error) => {
      if (error) console.error(`Error: ${error.message}`);
   });
}

Given('TESTPREFIX Transcript is fetched', function() {

   const fileName = path.basename(__filename);

   function getUpToSecondUnderscore(fileName: string) {
   const parts = fileName.split('_'); // Split the string by underscores
      if (parts.length > 2) {
         return parts.slice(0, 2).join('_'); // Join the first two parts
      }
      return '';
   }

   const prefix= getUpToSecondUnderscore(fileName);

   const transcriptData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../files/',`${prefix}_transcript.json`), 'utf-8'));
   userInputs = transcriptData.inputs.map((input: { userInput: any; }) => input.userInput);
   responsetxt = transcriptData.inputs.map((input: { expectedResponse: any; }) => input.expectedResponse);

   data = transcriptData.inputs.map((input: { userInput: any; expectedResponse: any; }) => ({
      userInput: input.userInput,
      expectedResponse: input.expectedResponse
   }));

});

When('TESTPREFIX User launches simulation', async function () {
 
   await getPage().goto('https://app.audirie.com/');
   await getPage().fill('[placeholder="name@example.com"]', 'suraj@audirie.com');
   await getPage().fill('[placeholder="Password"]', 'Test@1234');
   await getPage().click('button:has-text("Login")');
   await getPage().click('text=Admin - New Bundle Type');
   await getPage().click('text=Aged Care Simulations');
   await getPage().click('[title="Aged Care"]');
   await getPage().click('button:has-text("Resume"), button:has-text("Launch")');
   
   const dialog = getPage().locator('div[role="dialog"]');
   await dialog.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
      console.log('Dialog not found');
   });

   if (await dialog.isVisible()) {
      const LaunchSimulationButton = dialog.locator('a', { hasText: 'Launch Simulation' });
      if (await LaunchSimulationButton.isVisible()) {
      await LaunchSimulationButton.click();
      }
   }
   
   await getPage().waitForTimeout(13000);
      
});



Then('TESTPREFIX User responds to Avatar', async function () {
   for (const { userInput, expectedResponse } of data) {
      // Log user input and expected response
      this.attach('User Input: ' + userInput);
      this.attach('Expected Response: ' + expectedResponse);

      // Wait for the "Next" button to appear
      await getPage().waitForSelector('//a[text()="Next"]');
      await getPage().waitForTimeout(3000);

      // Convert the user input to audio and play it
      await convertToAudio(userInput);
      playAudio(wavFilePath);

      // Wait for the audio to play
      await getPage().waitForTimeout(10000);

      // Click the "Next" button
      await getPage().locator('//a[text()="Next"]').click();

      // Get the Avatar's response
      const avatarResponse = await getPage().textContent('//div[@id="questions"]/div[2]/p');
      this.attach('Avatar Response: ' + avatarResponse);

      // Perform similarity check
      const similarityCategory = await getSemanticSimilarity(expectedResponse, avatarResponse || '');
      this.attach('Similarity Check: ' + similarityCategory);

      fs.unlink(wavFilePath, (err) => {
         if (err) {
             console.error(`Error deleting file: ${err}`);
         } else {
             console.log(`File deleted successfully: ${wavFilePath}`);
         }
      });

      fs.unlink(outputFilePath, (err) => {
         if (err) {
            console.error(`Error deleting file: ${err}`);
         } else {
            console.log(`File deleted successfully: ${outputFilePath}`);
         }
      });
   }
});


Then('TESTPREFIX Verify the Avatar response with expected response', async function () {

   

});