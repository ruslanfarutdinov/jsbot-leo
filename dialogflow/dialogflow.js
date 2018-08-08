const path = require('path');
const dialogflow = require('dialogflow');

// You can find your project ID in your Dialogflow agent settings
const projectId = 'oscarstrivia-11986'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';
 
// Instantiate a DialogFlow client.
const sessionClient = new dialogflow.SessionsClient({
	keyFilename: path.join(__dirname, '/../config/OscarsTrivia-4fea9e036b88.json'),
});
 
// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
function getAnswer(query, callback) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  // Send request and handle the result with a callback
  sessionClient.detectIntent(request, callback);
}

module.exports = getAnswer;
