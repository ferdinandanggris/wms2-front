import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const CustomerList = ({ user, data, refreshData, deleteData, exportData }) => {
    const title = "Customer";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/master/customer";
    const url = "customer";
    const role = "Master - Customer";

    const columns = [
        { label: "CODE", key: "code", width: 100, type: "number", align: "left", cardTitle: true },
        { label: "NAME", key: "name", width: 40, type: "number", align: "left", cardSubTitle: true },
        { label: "STATUS", key: "isActive", width: 100, type: "custom", align: "middle", cardSubTitle: true },
    ];

    const exportFilename = "item-type.csv";

    useEffect(() => {
        if (user !== null) {
            refreshData({ url });
        }
    }, [user, refreshData]);

    const customRenderValue = (col, value, item) => {
        if (col.key == "isActive") {
            if (value == 0)
                return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">Active</div></h6 >);
            else
                return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">In Active</div></h6 >);
        }
    };

    return (
        <ListWrapper
            img={img}
            title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue}
        />
    )
};

CustomerList.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    refreshData: PropTypes.func,
    deleteData: PropTypes.func,
    exportData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(CustomerList);
