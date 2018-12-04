export default class Utils {
    static getTime() {
        return new Date().getTime();
    }

    static genName() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text + this.random(0, 9999);
    }

    static genDate() {
        return this.random(1, 12) + "/" + this.random(1, 31) + "/" + this.random(1900, 2018);
    }

    static random(min, max) {
        return ~~(Math.random() * (max - min + 1)) + min
    }
}