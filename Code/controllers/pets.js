
exports.getPetsOfType = function(types, start, count) {
    let typeSelectStr = "";
    types.forEach((type) => {
        if(typeSelectStr)
            typeSelectStr += ", ";
        typeSelectStr += "?";
    });
    let params = [start];
    types.forEach((type) => params.push(type));
    params.push(count);
    return new Promise((resolve, reject) => {
        global.db.all(
            "SELECT pets.id as id, pet_types.name as type, pets.name as name, genders.name as gender, pets.birth, pets.picture," +
            "pets.price, pets.weight, pets.description " +
            "FROM pets, pet_types, genders " +
            "WHERE pets.gender = genders.id AND pets.type_id = pet_types.id " +
            "AND pets.id >= ? AND pet_types.name in (" + typeSelectStr + ")" +
            "ORDER BY pets.id LIMIT ?;"
            , params
            , (err, rows) => {
                if(err)
                    reject(err);
                resolve(rows);
            });
    });
}

exports.getPet = function(id) {
    return new Promise((resolve, reject) => {
        global.db.all(
            "SELECT pets.id as id, pet_types.name as type, pets.name as name, genders.name as gender, pets.birth, pets.picture," +
            "pets.price, pets.weight, pets.description " +
            "FROM pets, pet_types, genders " +
            "WHERE pets.gender = genders.id AND pets.type_id = pet_types.id " +
            "AND pets.id = ?;"
            , [id]
            , (err, pet) => {
                if(err)
                    reject(err);
                resolve(pet[0]);
            });
    });
}