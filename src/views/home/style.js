const styles = {
  cardTitle: {
    color: "#2AB6C7",
    fontWeight: "bold",
    margin: "0px",
    fontSize: "20px",
  },
  cardTitleSecondary: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  cardInfoBox: { height: 280, position: "relative" },
  cardInfoTotal: {
    color: "white",
    marginTop: "5px",
    fontWeight: "bold",
  },
  cardSpkInfoLabel: (primary) => ({
    height: "80px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    background: primary ? "#2AB6C7" : "#23919E",
  }),
  tableHeader: {
    backgroundColor: "#f3f2f7",
    color: "#222",
    textAlign: "center",
  },
};

export default styles;
