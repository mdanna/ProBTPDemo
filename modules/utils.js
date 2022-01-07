const utils = {
  getTwoDigitNumber(num){
    num = num + '' || '0';
    return num.length === 1 ? `0${num}`: num;
  },

  formatTime(d){
    return `${utils.getTwoDigitNumber(d.getHours())}h${utils.getTwoDigitNumber(d.getMinutes())}`;
  },

  formatDate(d){
    let weekDay = '';
    switch(d.getDay()){
      case 0:
        weekDay = 'Dimanche';
        break;
      case 1:
        weekDay = 'Lundi';
        break;
      case 2:
        weekDay = 'Mardi';
        break;
      case 3:
        weekDay = 'Mercredi';
        break;
      case 4:
        weekDay = 'Jeudi';
        break;
      case 5:
        weekDay = 'Vendredi';
        break;
      case 6:
        weekDay = 'Samedi';
        break;
      default:
        weekDay = 'Dimanche';
        break;
    }
    
    let month = '';
    switch(d.getMonth()){
      case 0:
        month = 'janvier';
        break;
      case 1:
        month = 'février';
        break;
      case 2:
        month = 'mars';
        break;
      case 3:
        month = 'avril';
        break;
      case 4:
        month = 'mai';
        break;
      case 5:
        month = 'juin';
        break;
      case 6:
        month = 'juillet';
        break;
      case 7:
        month = 'août';
        break;
      case 8:
        month = 'septembre';
        break;
      case 9:
        month = 'octobre';
        break;
      case 10:
        month = 'novembre';
        break;
      default:
        month = 'décembre';
        break;
    }
    return `${weekDay} ${d.getDate()} ${month} ${d.getFullYear()}`;
  }
};