const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).*$/;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const validateEmail = email => {
  if (!emailRegex.test(email)) {
    const error = new Error('Invalid email format');
    error.statusCode = 400;
    throw error;
  }
};

const validatePassword = password => {
  if (!passwordRegex.test(password)) {
    const error = new Error(
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    );
    error.statusCode = 400;
    throw error;
  }
};

const validateName = name => {
  if (name.length < 2 || name.length > 30) {
    const error = new Error('Name must be between 2 and 30 characters');
    error.statusCode = 400;
    throw error;
  }
};

const validateAvatarUrl = avatarUrl => {
  if (!urlRegex.test(avatarUrl)) {
    const error = new Error('Invalid URL format for avatar');
    error.statusCode = 400;
    throw error;
  }
};
const requiredFieldsValidation = requiredFields => {
  return async function (req, reply) {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        const error = new Error(`${field} is required`);
        error.statusCode = 400;
        throw error;
      }
      if (field === 'email') {
        validateEmail(req.body[field]);
      }
      if (field === 'password') {
        validatePassword(req.body[field]);
      }
      if (field === 'name') {
        validateName(req.body[field]);
      }
      if (field === 'avatarUrl') {
        validateAvatarUrl(req.body[field]);
      }
    }
  };
};
module.exports = requiredFieldsValidation;
