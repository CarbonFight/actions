exports.createBadgeModel = function(uid){
    return(
        {
            uid,
            onboardingHowtoFinished: false,
            onboardingAllChallenges: false
        }
    )
}
