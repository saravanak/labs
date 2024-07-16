"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy = {
    policy: {
        shelf: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Shelf_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        rack: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Rack_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        luggage: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Luggage_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        user: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: User_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        space: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Space_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        spaceSharing: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: SpaceSharing_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        account: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Account_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        session: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Session_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        verificationToken: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: VerificationToken_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        authenticator: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Authenticator_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        country: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Country_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        carbonFootprint: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: CarbonFootprint_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        demographics: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Demographics_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        emissionVehicles: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: EmissionVehicles_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        todo: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Todo_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        comment: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Comment_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        statusMeta: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: StatusMeta_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        statusTransitions: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: StatusTransitions_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
        commentable: {
            modelLevel: {
                read: {
                    guard: false,
                },
                create: {
                    guard: false, inputChecker: Commentable_create_input,
                },
                update: {
                    guard: false,
                },
                postUpdate: {
                    guard: true,
                },
                delete: {
                    guard: false,
                }
            },
            fieldLevel: {
                read: {},
                update: {},
            },
        },
    },
    validation: {
        shelf: {
            hasValidation: false
        },
        rack: {
            hasValidation: false
        },
        luggage: {
            hasValidation: false
        },
        user: {
            hasValidation: false
        },
        space: {
            hasValidation: false
        },
        spaceSharing: {
            hasValidation: false
        },
        account: {
            hasValidation: false
        },
        session: {
            hasValidation: false
        },
        verificationToken: {
            hasValidation: false
        },
        authenticator: {
            hasValidation: false
        },
        country: {
            hasValidation: false
        },
        carbonFootprint: {
            hasValidation: false
        },
        demographics: {
            hasValidation: false
        },
        emissionVehicles: {
            hasValidation: false
        },
        todo: {
            hasValidation: false
        },
        comment: {
            hasValidation: false
        },
        statusMeta: {
            hasValidation: false
        },
        statusTransitions: {
            hasValidation: false
        },
        commentable: {
            hasValidation: false
        },
    },
};
function Shelf_create_input(input, context) {
    return false;
}
function Rack_create_input(input, context) {
    return false;
}
function Luggage_create_input(input, context) {
    return false;
}
function User_create_input(input, context) {
    return false;
}
function Space_create_input(input, context) {
    return false;
}
function SpaceSharing_create_input(input, context) {
    return false;
}
function Account_create_input(input, context) {
    return false;
}
function Session_create_input(input, context) {
    return false;
}
function VerificationToken_create_input(input, context) {
    return false;
}
function Authenticator_create_input(input, context) {
    return false;
}
function Country_create_input(input, context) {
    return false;
}
function CarbonFootprint_create_input(input, context) {
    return false;
}
function Demographics_create_input(input, context) {
    return false;
}
function EmissionVehicles_create_input(input, context) {
    return false;
}
function Todo_create_input(input, context) {
    return false;
}
function Comment_create_input(input, context) {
    return false;
}
function StatusMeta_create_input(input, context) {
    return false;
}
function StatusTransitions_create_input(input, context) {
    return false;
}
function Commentable_create_input(input, context) {
    return false;
}
exports.default = policy;
