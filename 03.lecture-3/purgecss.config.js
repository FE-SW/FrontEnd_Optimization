module.exports = {
  defaultExtractor: (content) => content.match(/[\w\:\-]+/g) || [], // \w = [0-9a-zA-Z_]
};

//어디까지 clssName으로 인정할 것이지 설정
