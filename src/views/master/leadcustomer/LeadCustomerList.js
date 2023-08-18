import { useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const LeadCustomerList = ({ user, data, refreshData, deleteData, exportData }) => {
    const title = "LeadCustomerList";
    const img = <FaUserFriends className="module-img" />;
    const path = "/master/lead-customer";
    const url = "LeadCustomer";
    const role = "Master - LeadCustomer";

    const columns = [
        { label: "CUSTOMER", key: "namaDagang", width: 100, type: "number", align: "left", cardTitle: true },
        { label: "PHONE NUMBER", key: "mobile1", width: 40, type: "number", align: "left", cardSubTitle: true },
        { label: "EMAIL", key: "email", width: 100, type: "custom", align: "middle", cardSubTitle: true },
        { label: "CREATED DATE", key: "dateIn", width: 100, type: "datetime", align: "middle", cardSubTitle: true },
    ];

    const exportFilename = "item-type.csv";

    useEffect(() => {
        if (user !== null) {
            refreshData({ url });
        }
    }, [user, refreshData]);
    return (
        <ListWrapper
            img={img}
            title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData}
        />
    )
};

LeadCustomerList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(LeadCustomerList);
