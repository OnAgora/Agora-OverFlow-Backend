const userRegistered = "User resgister successfully";
const userDoesNotExist = "User does not exist";
const userEmailNotValid = "User email is not valid";
const userPasswordNotValid = "User password is not valid";
const userPasswordWrong = "User password not correct";
const userExist = "User already exist";
const emailNotSend = "Could not send the email";
const loginsuccess = "login successfully";
const loginError = "There is an issue while login";
const resgisterError = "There is an issue in register user";
const forgetPasswordMessage =
  "Reset password link send to you email Please check your email";
const forgetPasswordError =
  "There is an error while sending the email on given address! Please try again later";
const updatePasswordMessage = "Pasword updated successfully";
const getUserMessageSuccess = "User data find successfully";
const getUserMessageFail = "User data fetch failed";
const resetTokenIsNotValid =
  "Reset Token is not valid please try again later with new reset password link";
const tokenProvideMessage = "Please provide token";
const tokeExpired =
  "This password reset token is invalid, Token expired! Please request for new link";
const userHaveRole = "User have already this role";
const userNotHaveRole = "User does not have this role";
const userRoleUpdated = "User role is updated successfully";
const roleNotExist = "Plesae provide valid role";
const jwtTokeExpired = "Invalid token, Token expired! Please login again";
const userNotHaveRights = "You dont have rights";
const invalidPayload = "Please provide valid payload";
const accountNotApproved =
  "There is an error while sending email please contact admin";
const passwordResetTokenInvalid = "This password reset token is invalid";
const sessionError = "Session expired please login first";
const logOutSuccess = "logout successfully";
const logOutError = "There is an issue while logout";
const nftMintedSuccess =
  "NFT Minted and deposit to your collection successfully";
const nftMintedError = "There is an error while NFT Minting";
const nftCollectionExist = "Collection with that name already exist";
const nftCollectionUploadSuccess =
  "NFT collection uploaded successfully";
const nftCollectionUploadNotExist =
  "Cannot find specified NFT collection directory";
const nftCollectionUploadError = "There is an error while uploading collection";
const metadataUploadSuccess = "The metadata has be uploaded successfully";
const metadataUploadFailure = "The metadata failed to be uploaded";
const nftListedSuccess = "NFT listed for sale successfully";
const nftListedError = "There is an error while NFT listed for sale";
const nftListFloorPriceError = "Listing price must be greater than collection's floor price";
const nftUnListedSuccess = "NFT Unlisted from sale successfully";
const nftUnListedError = "There is an error while NFT Unlisting from sale";
const nftPriceUpdatedSuccess = "NFT listed price updated for sale successfully";
const nftPriceUpdatedError =
  "There is an error while updating NFT listed price for sale";
const nftRoyalityUpdatedSuccess = "royality updated successfully";
const nftRoyalityUpdatedError = "There is an error while updating royality";
const nftMarketCutUpdatedSuccess = "marketcut updated successfully";
const nftMarketCutUpdatedError = "There is an error while updating marketcut";
const createSaleCollectionSuccess = "sale collection created successfully";
const createSaleCollectionError =
  "There is an error while creating sale collection";
const createNFTCollectionSuccess = "NFT collection created successfully";
const createNFTCollectionError =
  "There is an error while creating NFT collection";
const getAllListedNFTsByUserSuccess =
  "get the user NFT Collection successfully";
const getAllListedNFTsByUserError = "Could not NFT collection";
const getUserNFTsSuccess = "get the user NFTs successfully";
const getUserNFTsError = "Could not NFTs";
const getUserBalanceSuccess = "get the user NFTs successfully";
const getUserBalanceError = "Could not NFTs";
const getUserSessionSuccess = "User have sessions";
const getUserSessionError = "User don't have sessions";
const creatorCreationSuccess = "Creator created successfully";
const creatorCreationFailure = "Could not create the Creator";
const creatorTypeCreationSuccess = "Creator type created succesfully";
const creatorTypeCreationFailure = "Creator type creation Failed";
const creatorCategorySuccess = "Category type created sucessfully";
const creatorCategoryFailure = "Category type creation Failed";


module.exports = {
  creatorCategorySuccess,
  creatorCategoryFailure,
  creatorTypeCreationSuccess,
  creatorTypeCreationFailure,
  creatorCreationSuccess,
  creatorCreationFailure,
  userRegistered,
  userDoesNotExist,
  userExist,
  userPasswordWrong,
  loginsuccess,
  resgisterError,
  forgetPasswordMessage,
  getUserMessageSuccess,
  getUserMessageFail,
  updatePasswordMessage,
  emailNotSend,
  userEmailNotValid,
  userPasswordNotValid,
  forgetPasswordError,
  resetTokenIsNotValid,
  tokenProvideMessage,
  tokeExpired,
  userHaveRole,
  userNotHaveRole,
  userRoleUpdated,
  jwtTokeExpired,
  roleNotExist,
  userNotHaveRights,
  invalidPayload,
  accountNotApproved,
  passwordResetTokenInvalid,
  loginError,
  sessionError,
  logOutSuccess,
  logOutError,
  nftCollectionExist,
  nftCollectionUploadSuccess,
  nftCollectionUploadError,
  nftCollectionUploadNotExist,
  metadataUploadSuccess,
  metadataUploadFailure,
  nftMintedSuccess,
  nftMintedError,
  nftListedSuccess,
  nftListedError,
  nftUnListedSuccess,
  nftUnListedError,
  nftPriceUpdatedSuccess,
  nftPriceUpdatedError,
  nftRoyalityUpdatedSuccess,
  nftRoyalityUpdatedError,
  nftMarketCutUpdatedSuccess,
  nftMarketCutUpdatedError,
  createSaleCollectionSuccess,
  createSaleCollectionError,
  createNFTCollectionSuccess,
  createNFTCollectionError,
  getAllListedNFTsByUserSuccess,
  getAllListedNFTsByUserError,
  getUserNFTsSuccess,
  getUserNFTsError,
  getUserBalanceSuccess,
  getUserBalanceError,
  getUserSessionSuccess,
  getUserSessionError,
  nftListFloorPriceError,
};
