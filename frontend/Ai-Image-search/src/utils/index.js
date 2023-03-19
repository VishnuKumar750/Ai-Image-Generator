import FileSaver from 'file-saver'

import { surpriseMePrompts } from "../constants/Constants";

export function getRandomSurpriseMe(prompt) {
   const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

   const surprisePrompt = surpriseMePrompts[randomIndex];

   if(surprisePrompt === prompt) return getRandomSurpriseMe(prompt);

   return surprisePrompt;
}

// downloader 
export async function downloadImage( _id, photo ) {
   FileSaver.saveAs(photo, `download-${_id}.jpg`)
}