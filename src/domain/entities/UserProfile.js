class UserProfile {
  constructor({ id, userId, fullName, age, avatarUrl, difficultyLevel, gender = null, dialect = 'mx_neutral', createdAt, updatedAt }) {
    this.id = id;
    this.userId = userId;
    this.fullName = fullName;
    this.age = age;
    this.avatarUrl = avatarUrl;
    this.difficultyLevel = difficultyLevel;
    this.gender = gender;
    this.dialect = dialect;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isAdult() {
    return this.age >= 18;
  }

  hasAvatar() {
    return this.avatarUrl && this.avatarUrl.trim() !== '';
  }

  static createFromRegistration({ userId, fullName, age, avatarUrl = null, difficultyLevel = null, gender = null, dialect = 'mx_neutral' }) {
    return new UserProfile({
      id: null,
      userId,
      fullName,
      age,
      avatarUrl,
      difficultyLevel,
      gender,
      dialect,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  updateProfile({ fullName, age, avatarUrl, difficultyLevel, gender, dialect }) {
    if (fullName !== undefined) this.fullName = fullName;
    if (age !== undefined) this.age = age;
    if (avatarUrl !== undefined) this.avatarUrl = avatarUrl;
    if (difficultyLevel !== undefined) this.difficultyLevel = difficultyLevel;
    if (gender !== undefined) this.gender = gender;
    if (dialect !== undefined) this.dialect = dialect;
    this.updatedAt = new Date();
  }
}

module.exports = UserProfile;
