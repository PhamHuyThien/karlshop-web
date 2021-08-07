const Utils = {
    formatMoney: function(money) {
        return (money+"").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}

export default Utils;
