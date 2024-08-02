import { CategoryScale, Chart as ChartJs, Legend, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { IAuthUser, RolesEnum } from "../../types/auth.types";
import { Line } from "react-chartjs-2";

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface IProps {
    usersList: IAuthUser[];
}

const UserChartSection = ({usersList}:IProps) => {

    const ChartLabels = [RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER];
    const ChartValues = [];

    const ownersCount = usersList.filter((q) => q.roles.includes(RolesEnum.OWNER)).length;
    ChartValues.push(ownersCount);

    const adminsCount = usersList.filter((q) => q.roles.includes(RolesEnum.ADMIN)).length;
    ChartValues.push(adminsCount);

    const managersCount = usersList.filter((q) => q.roles.includes(RolesEnum.MANAGER)).length;
    ChartValues.push(managersCount);

    const usersCount = usersList.filter((q) => q.roles.includes(RolesEnum.USER)).length;
    ChartValues.push(usersCount);

    const ChartOptions = {
        responsive:true,
        scales: {
            x: {
                grid: { Display:false },
            },
            y: {
                ticks: { stepSize:2 },
            },
        },
    };

    const ChartData = {
        labels: ChartLabels,
        datasets: [
            {
                label: "count",
                data: ChartValues,
                backgroundColor: "#754eb4",
                borderColor: "#754eb4",
                pointBorderColor: "transparent",
                tension: 0.5,
            },
        ],
    };

  return (
    <div className="col-span-1 lg:col-span-3 bg-white p-2 rounded-md">
        <h2 className="text-lg font-bold flex justify-center">User Chart</h2>
        <Line options={ChartOptions} data={ChartData} className="bg-white p-2 rounded-md"/>
    </div>
  );
};

export default UserChartSection;