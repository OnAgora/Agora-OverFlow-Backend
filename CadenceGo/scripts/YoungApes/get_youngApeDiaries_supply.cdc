import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"

// This scripts returns the number of Young Apes currently in existence.

pub fun main(): UInt64 {
    return YoungApeDiaries.totalSupply
}
