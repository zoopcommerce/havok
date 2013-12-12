var tokenize = function(queryString){

    var chr,
        token = null,
        tokens = [],
        queryString = queryString.split('');

    while (chr = queryString.shift()){
        if (chr == ' '){
            tokens.push(token);
            delete(token);
        } else if (chr == '['){
            if (token) tokens.push(token);
            token = {type: 'attribute', name: ''};
        } else if (chr == ']'){
            tokens.push(token);
            token = null;
        } else if (!token){
            token = {type: 'tag', name: chr};
        } else {
            token.name = token.name + chr;
        }
    }

    if (token) tokens.push(token);

    return tokens;
}

exports.getTestFunc = function(queryString){

    var tokens = tokenize(queryString);

    return function(node){
        var i,
            j,
            token,
            match;

        for (i = 0; i < tokens.length; i++){
            token = tokens[i];
            if (token.type == 'tag'){
                if (node.tagName != token.name) return false;
            } else if (token.type == 'attribute'){
                for (j = 0; j < node.attributes.length; j++) {
                    match = false
                    if (node.attributes[j].name == token.name) match = true;
                }
                if (!match) return false;
            }
        }

        return true;
    }
};
