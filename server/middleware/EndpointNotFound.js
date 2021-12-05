export default (req, res, next) => {
    res.status(404).contentType("application/json").send({"error": "Data endpoint does not exist."});
    return;
};