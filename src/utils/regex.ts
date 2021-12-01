const Regex = {
  mobile: /^1\d{10}$/,
  email: /^[\w-]+@([\dA-Za-z]+\.)+(com|cn|net|org)$/,
  chinese: /^[0-\\aefu]*$/,
  url: /^((https?|ftp|file):\/\/)?([\d.a-z-]+)\.([.a-z]{2,6})([\w ./-]*)*\/?$/,
  id_card: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[\dXx]$/,
  left_blank: /^\s*/g, // 匹配左空格
  right_blank: /\s*$/g, // 匹配右空格
  left_right_blank: /^\s*|\s*$/g, // 匹配右空格
}

export default Regex
