//formating passed string
function printQuestionAnswer(str) {
    if(!str)return;
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
    {
        return index == 0 ? word.toUpperCase() : word.toLowerCase();
    }).replace(/\s+/g, ' ');
}

module.exports = printQuestionAnswer;

