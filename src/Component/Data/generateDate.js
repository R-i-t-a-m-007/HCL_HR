import moment from "moment";

const generateDate = (length = 7) => {
  // let arr = [];
  // for (let i = 0; i < length; i++) {
  //   let rand1 = Math.random() * 15 + 5;
  //   let rand2 = Math.random() * 15 + 5;
  //   let date = moment()
  //     .subtract(i, "day")
  //     .toDate();

  //   arr.unshift({
  //     date: moment(date).format("MMMM D, YYYY"),
  //     index: i,
  //     spent: Math.ceil(rand1),
  //     items: Math.ceil(rand2)
  //   });
  // }

  const arr = [
    {date: 'Jan', index: 6, spent: 13, items: 100},
    {date: 'Feb', index: 5, spent: 17, items: 190},
    {date: 'Mar', index: 4, spent: 17, items: 200},
    {date: 'Apr', index: 3, spent: 19, items: 140},
    {date: 'May', index: 2, spent: 12, items: 190},
    {date: 'June', index: 1, spent: 11, items: 180},
    {date: 'Jul', index: 0, spent: 8, items: 120},
    {date: 'Aug', index: 1, spent: 13, items: 110},
    {date: 'Sep', index: 5, spent: 13, items: 190},
    {date: 'Oct', index: 3, spent: 18, items: 200},
    {date: 'Nov', index: 3, spent: 19, items: 140},
    {date: 'Dec', index: 2, spent: 12, items: 190}
  ];
  return arr;
};

export default generateDate;