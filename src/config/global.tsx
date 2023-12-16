export const minute_data = [
    { value: '00', label: '00' },
    { value: '05', label: '05' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' },
    { value: '35', label: '35' },
    { value: '40', label: '40' },
    { value: '45', label: '45' },
    { value: '50', label: '50' },
    { value: '55', label: '55' },
];

export const hour_data = [
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '00', label: '00' },
    { value: '01', label: '01' },
    { value: '02', label: '02' },
];

export const month_data = [
    { value: '1', label: '1月' },
    { value: '2', label: '2月' },
    { value: '3', label: '3月' },
    { value: '4', label: '4月' },
    { value: '5', label: '5月' },
    { value: '6', label: '6月' },
    { value: '7', label: '7月' },
    { value: '8', label: '8月' },
    { value: '9', label: '9月' },
    { value: '10', label: '10月' },
    { value: '11', label: '11月' },
    { value: '12', label: '12月' },
]

export const race_number_data = [
    { value: '1R', label: '1R' },
    { value: '2R', label: '2R' },
    { value: '3R', label: '3R' },
    { value: '4R', label: '4R' },
    { value: '5R', label: '5R' },
    { value: '6R', label: '6R' },
    { value: '7R', label: '7R' },
    { value: '8R', label: '8R' },
    { value: '9R', label: '9R' },
    { value: '10R', label: '10R' },
    { value: '11R', label: '11R' },
    { value: '12R', label: '12R' },
]

export const checkOverlap = (array: any) => {
  
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const newArray = array.filter((item:any) => item == element);
      if (newArray.length > 1) {
        return false;
      }else{
        return true;
      }
    }
  
};