import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from "victory";
const Homeadmin = () => {
  const navigate = useNavigate();
  const data = [
    { x: "Data 1", y: 10 },
    { x: "Data 2", y: 20 },
    { x: "Data 3", y: 30 },
  ];

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="grid grid-cols-4 bg-white m-10 rounded-xl p-5">
          <div className="flex flex-col gap-5 justify-center ">
            <button
              className="bg-yellow-900 hover:bg-yellow-950 text-white p-3 text-2xl rounded-xl  "
              onClick={() => {
                navigate("/tambahStok");
              }}
            >
              Tambah Stok
            </button>
            <button className="bg-yellow-900 hover:bg-yellow-950 text-white p-3 text-2xl rounded-xl  ">
              Tambah Produk
            </button>
            <button className="bg-yellow-900 hover:bg-yellow-950 text-white p-3 text-2xl rounded-xl  ">
              History pesanan
            </button>
          </div>
          <div className="col-span-3 bg-black">
            {" "}
            <div className=" bg-white">
              <VictoryChart domainPadding={20} height={300}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar
                  data={data}
                  x="x"
                  y="y"
                  style={{ data: { fill: "#964B00" } }}
                  labelComponent={<VictoryTooltip />}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homeadmin;
