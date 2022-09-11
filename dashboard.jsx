import React, { useEffect, useState } from "react";
import EmployeeName from "./EmployeeName";
import EmployeeSalary from "./EmployeeSalary";

export const Dashboard = () => {
  var [alldata, setAlldata] = useState([]);

  var [sort, setSort] = useState("topTen");

  var [topTen, setTopTen] = useState([]);

  var [topBottom, setTopBottom] = useState([]);

  var API = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees`;

  useEffect(() => {
    const res1 = fetch(`${API}?page=1`);
    const res2 = fetch(`${API}?page=2`);
    const res3 = fetch(`${API}?page=3`);
    const res4 = fetch(`${API}?page=4`);
    const res5 = fetch(`${API}?page=5`);
    const res6 = fetch(`${API}?page=6`);
    const res7 = fetch(`${API}?page=7`);

    Promise.all([res1, res2, res3, res4, res5, res6, res7])
      .then((value) => {
        return Promise.all(value.map((el) => el.json()));
      })
      .then((value) => {
        var newAllData = [];

        for (var j = 0; j < value.length; j++) {
          var arr = value[j].data;

          newAllData.push(...arr);
        }

        var sortedData = newAllData.sort((a, b) => {
          var x = a.salary;
          var y = b.salary;
          if (x > y) return -1;
          if (x < y) return 1;
        });

        var topTenData = sortedData.filter((item, ind) => ind < 10);

        var topBottomData = sortedData.filter((item, ind) => ind > 59);

        let topT = topTenData.sort((a, b) => {
          let x = a.salary;

          let y = b.salary;
          if (x > y) return -1;

          if (x < y) return 1;
        });

        let topB = topBottomData.sort((a, b) => {
          let x = a.salary;

          let y = b.salary;
          if (x > y) return 1;

          if (x < y) return -1;
        });

        setAlldata(topT);

        setTopTen(topT);

        setTopBottom(topB);
      });
  }, []);

  const handleSort = () => {
    sort === "topTen" ? setSort("topBottom") : setSort("topTen");

    sort === "topTen" ? setAlldata(topBottom) : setAlldata(topTen);
  };

  return (
    <div>
      <button onClick={handleSort} data-testid="sorting-btn">
        {" "}
        {sort === "topTen" ? "Bottom 10 Employees" : "Top 10 Employees"}
      </button>

      <div data-testid="employee-data">
        {alldata &&
          alldata.map((item, ind) => (
            <>
              <EmployeeName key={ind} Name={item.name} />

              <EmployeeSalary key={item.id} Salary={item.salary} />
            </>
          ))}
      </div>
    </div>
  );
};
