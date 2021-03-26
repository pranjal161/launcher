const elements = {
    payments : {
        keys: ['payment', 'versement', 'vl', 'up'],
        activities: {
            unsolicitedPayment: ['vl', 'up', 'unsolicited', 'libre', 'ultérieur'],
        }
    },
    newBusiness : {
        keys: ['business', 'contrat'],
        activities: {
            newBusiness: ['new', 'nouveau', 'contrat', 'création', 'create'],
        }
    },
    rachat : {
        keys: ['rachat'],
        activities: {
            rachatTotal: ['rachat', 'total', 'full'],
            rachatPartiel: ['rachat', 'partiel', 'partial'],
        }
    },
    PostalAddress : {
        keys: ['postal', 'postale', 'adresse', 'address', 'déménagement', 'domicile', 'move'],
        activities: {
            createPostalAddress: ['create', 'création'],
            updatePostalAddress: ['change', 'changer', 'update', 'modifier', 'déménagé', 'à jour', 'modification'],
            deletePostalAddress: ['supprimer', 'arrêter', 'delete', 'remove']
        }
    },
    emailAccount : {
        keys: ['email', 'adresse', 'address', 'mail', '@'],
        activities: {
            createEmailAddress: ['create', 'création'],
            updateEmailAddress: ['change', 'changer', 'update', 'modifier', 'à jour', 'modification'],
            deleteEmailAddress: ['supprimer', 'arrêter', 'delete', 'remove']
        }
    },
    bankAccount : {
        keys: ['bank', 'account', 'rib', 'iban', 'compte', 'bancaire'],
        activities: {
            createBankAccount: ['create', 'création'],
            updateBankAccount: ['change', 'changer', 'update', 'modifier', 'à jour', 'modification'],
            deleteBankAccount: ['supprimer', 'arrêter', 'delete', 'remove']
        }
    }


}
Array.prototype.unique = function () {
    return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
}

const removeAccent = (word) => word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
const convertWord = (word) => removeAccent(word).toUpperCase()

const ticketForTesting = {
    title: "Création de contrat ",
    description: 'Aussi la personne a déménagé et il faudrait modifier son adresse postale.',
    suggestedActivities: {
        createPostalAddress : {score: 1, status: 'removed'},
        updatePostalAddress : {score: 2, status: 'executed'},
        updateEmailAddress : {score: 1, status: 'suggested'}
    }

}

const foundSuggestedActivities = (ticket) => {
    const titleAndDescription = convertWord(ticket && ticket.title + ' ' + ticket.description)
    const reg = new RegExp("[ ,.]+", "g");
    const uniqueWords = titleAndDescription.split(reg).unique()


    const result = Object.values(elements).map(element => {
        //If one is find, it's ok to parse activities elements
        const keys = element.keys.map(key => convertWord(key))

        const reducer = (keyWordsFound, currentWord) => keyWordsFound || keys.includes(currentWord)
        const found = uniqueWords.reduce(reducer, 0)
        if (found) {
            const resEntity = Object.values(element.activities).map((activity, index) => {
                const activityKeys = activity.map(activityKey => convertWord(activityKey))
                const reducer = (keyWordsCounter, currentWord) => {
                    const incr = activityKeys.includes(currentWord) ? 1 : 0
                    return keyWordsCounter + incr
                }
                const activityScore = uniqueWords.reduce(reducer, 0)
                return activityScore > 0 ? {[Object.keys(element.activities)[index]]: activityScore} : undefined
            })
            return resEntity.filter(it => it)
        }
    })
    return result.filter(it => it).flat()
}

export const getSuggestedActivities = (ticket) => {
    const newSuggestedList = foundSuggestedActivities(ticket).flat()

    const result = {}
    newSuggestedList.forEach(suggestion => {
        const [activityScore] = Object.entries(suggestion)
        const existingActivity = ticket.suggestedActivities && ticket.suggestedActivities[activityScore[0]] ? ticket.suggestedActivities[activityScore[0]] : {}
        result[activityScore[0]] = {status : 'suggested', ...existingActivity, score : activityScore[1]}
    })
    return result
}


