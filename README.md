# This is WalkingStick.

#### Demonstration Video: 

## Project Description

Hello, world! And this is WalkingStick. This project consists of a chrome extension and a web app. The objective of this project is to help people with disability in navigating the internet (hence, the name "WalkingStick").

Before explaining how it functions, let me first explain how to use it.

### How to use?

1. The WalkingStick chrome extension needs to be installed in a Chromium-based browser. First, download the extension folder from the given files and then "load unpacked" from the Chromium-based browser. Here is a [StackOverflow thread](https://stackoverflow.com/questions/24577024/install-chrome-extension-form-outside-the-chrome-web-store) on how to do it. 

2. After installing it, the chrome extension will give a brief demo on how to use the extension.

>The two most fundamental functions of the extension is to redirect the new tab page to the WalkingStick [web app](https://walkingstickfp50.herokuapp.com/) and to read aloud the page by pressing any key on the keyboard.

3. From then on, after opening a new tab, it will be redirected to WalkingStick [web app](https://walkingstickfp50.herokuapp.com/).

>On first-time use, the user needs to give microphone access to the web app. 

4. After that, if the user says anything with 'define', the user will be provided with a definition of the word or phrase. Similarly, if the user says anything with 'news' or 'play', the user will get news articles or music videos from YouTube.

And that's it!

### Functioning of the Project

Now let's talk about the functioning of the project. 

#### Functioning of the Chrome extension
Now let's talk about the functioning of the project. 

1. **manifest.json:** In the manifest.json file, which every Chrome extension requires, I had specified, or rather instructed Chrome what to do. I have used manifest version 2 (although there is a manifest version 3, I didn't use that due to poor documentation). The Chrome extension has been instructed to open *Ntab.html* on pressing new tab, utilise two content scripts (*news.js* and *define.js*) to read aloud an article or definition, and then there is finally a background script (*background.js*) whose purpose in life is to load the *startup.html* when the extension has been installed for the first time (or updated).

2. **Ntab.html:** This is the HTML document that is first loaded after opening a new tab. A script associated with it (*code.js*) effectively redirects the new tab to [web app](https://walkingstickfp50.herokuapp.com/).

3. **Text-to-Speech scripts:** The scripts in this category include *define.js*, *news.js*, and *startup.js*. All of these scripts get a certain type of text from the websites (for example, *news.js* gets a text from the article tag in the news webpage provided by [Associated Press News](www.apnews.com)) and then read aloud those texts.

4. **background.js**: As said earlier, its purpose in life is to load *startup.html* when the extension is installed for the first time.

5. **startup.html:** This HTML document is loaded when the extension has been installed for the very first time. It gives a brief introduction on how to use the extension. A script (*startup.js*) is linked to it, which will read aloud the instructions when any key is pressed.

#### Functioning of the [Web App](https://walkingstickfp50.herokuapp.com/)

The [web app](https://walkingstickfp50.herokuapp.com/) is a standalone product. It doesn't require the extension to function. 

This is a Flask web application and is uploaded to [Heroku](www.heroku.com). It takes the user's command with the help of a microphone, recognises the speech and performs some function depending on the command the user has given.

1. **app.py:** This is the Flask application. It loads the *index.html* file when a user visits the web app and process the voice input (basically takes input from *script.js* and sends it back to the script in a JSON file).

2. **script.js:** This is the most important part of the Flask application. This script first takes the voice command from the user, by utilising the native voice recognition framework built-in most browsers (chromium-based), Web Speech API to be specific. I have referred to [Mozilla's guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) on how to achieve this. After that, using the same Web Speech API, I have analysed the command.

- When there is a "define" or "news" keyword in the command, the keyword is first removed from the command string. Then I have utilised [Google's Programmable Search Engine](https://programmablesearchengine.google.com/about/) API to search the definition of the word (or phrase) or news regarding that word or phrase respectively. To do that, I have first created two customized search engines on the programmable search engine's control panel, one for looking definition and the other for news articles, which would only look for a definition in [The Free Dictionary](https://www.thefreedictionary.com/) and news article in [Associated Press News](www.apnews.com). Then, with the help of the API, I have searched for the command string in the search engines and then utilised the API's return value (a JSON file) to obtain the first relevant result and redirect it to that result.

- Similarly, I have used the YouTube API to play music or videos.

>**NOTE:** In the *script.js* script, I have deliberately replaced my API Key with "API_Key" for security reasons. To get an API key, refer to [Google's guide](https://support.google.com/googleapi/answer/6158862?hl=en).

3. **styles.css:** Contains style guide.

4. **templates:** *layout.html* serves the general HTML format while *index.html* is shown when a user visits the web app. *index.html* is linked to *layout.html* with the help of Jinja syntax.

5. **Procfile and requirements.txt:** Contains requirements for the web app. 

#### Design Choice

The last thing I would like to talk about is my design choices, mostly to answer the question that why have I separated this project into two parts, the web app and the extension. The reason behind this is simplicity and efficiency. If I were to include the web app in the extension, some of the scripts would be blocked by Chrome because of security reasons. Also, it is more flexible to separate this so that any other extension or web app could utilise the WalkingStick web app.

##### And that is how the project works!

#### This was WalkingStick. Final Project for CS50X by Sourjya Sarkar.
#### [Github Profile](https://github.com/SourjyaSarkar2005/)
