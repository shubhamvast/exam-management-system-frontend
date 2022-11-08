//formating passed string
function printText(str) {
    if(!str)return;
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
    {
        return index == 0 ? word.toUpperCase() : word.toUpperCase();
    }).replace(/\s+/g, ' ');
}

module.exports = printText;

