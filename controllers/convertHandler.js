/*
*
*
*       Complete the handler logic below
*       
*       
*/
let inputRegex = /[a-z]+|[^a-z]+/gi

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    
    console.log(input.match(inputRegex))
    result = input.match(inputRegex)[0]
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    result = input.match(inputRegex)[1]
    
    var validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    
    if(!validUnits.includes(result)){
      return 'invalid unit'
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    
    if(initUnit === 'gal' || initUnit === 'GAL'){
      result = 'L'
    }else if(initUnit === 'l' || initUnit === 'L'){
      result = 'gal'
    }
    
    if(initUnit === 'lbs' || initUnit === 'LBS'){
      result = 'kg'
    }else if(initUnit === 'kg' || initUnit === 'KG'){
      result = 'lbs'
    }
    
     if(initUnit === 'mi' || initUnit === 'MI'){
      result = 'km'
    }else if(initUnit === 'km' || initUnit === 'KM'){
      result = 'mi'
    }
    
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    if(initUnit === 'gal' || initUnit === 'GAL'){
      result = (initNum * galToL).toFixed(5)
    }else if(initUnit === 'l' || initUnit === 'L'){
      result = (initNum/galToL).toFixed(5)
    }
    
    if(initUnit === 'lbs' || initUnit === 'LBS'){
      result = (initNum * lbsToKg).toFixed(5)
    }else if(initUnit === 'kg' || initUnit === 'KG'){
      result = (initNum/lbsToKg).toFixed(5)
    }
    
    if(initUnit === 'mi' || initUnit === 'MI'){
      result = (initNum * miToKm).toFixed(5)
    }else if(initUnit === 'km' || initUnit === 'KM'){
      result = (initNum/miToKm).toFixed(5)
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
