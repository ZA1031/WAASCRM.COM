import React, { useState, useEffect } from 'react';
import { customStyles } from "@/Template/Styles/DataTable";
import DataTable from 'react-data-table-component';
import { FilterComponent } from './FilterComponent';


const FilterTable = (props) => {
    const { dataList, tableColumns } = props;
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [keys, setKeys] = useState([]);

    const filerData = (item) => {
        for (let key of keys) {
            if (item[key] && String(item[key]).toLowerCase().includes(filterText.toLowerCase())) {
                return true;
            }
        }
    };

    const filteredItems = dataList.filter(
        item => filerData(item),
    );
    
    useEffect(() => {
        setKeys(Object.keys(dataList[0] ? dataList[0] : {}));
    } , [dataList]);

    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

    return (
        <div className="shadow-sm">
            <DataTable
                data={filteredItems}
                columns={tableColumns}
                center={true}
                paginationResetDefaultPage={resetPaginationToggle} 
                pagination
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
            />
        </div>
    );
};

export default FilterTable;