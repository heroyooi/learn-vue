module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(40), // 30자 이내
        allowNull: false, // 필수
        unique: true, // 중복금지
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // id, createdAt, updatedAt 자동으로 생성
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장돼요
    },
  );
  User.associate = (db) => {};
  return User;
};