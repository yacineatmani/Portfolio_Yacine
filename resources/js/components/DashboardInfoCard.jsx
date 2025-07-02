import React from 'react';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';

const iconColors = {
    blue: 'bg-blue-500 text-white',
    orange: 'bg-orange-500 text-white',
    cyan: 'bg-cyan-500 text-white',
    purple: 'bg-purple-500 text-white',
    gray: 'bg-gray-400 text-white',
};

const DashboardInfoCard = ({ title, value, icon, iconColor = 'gray', descriptionValue, descriptionText }) => {
    return (
        <div className="col-12 md:col-6 xl:col-3 p-2">
            <Card className="shadow-md">
                <div className="flex items-center gap-4">
                    <div className={classNames('rounded-full p-3 text-2xl', iconColors[iconColor] || iconColors.gray)}>
                        <i className={classNames('pi', `pi-${icon}`)}></i>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-gray-800">{title}</div>
                        <div className="text-2xl font-extrabold text-blue-900">{value}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            <span className="font-bold text-black mr-1">{descriptionValue}</span>
                            {descriptionText}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DashboardInfoCard;
