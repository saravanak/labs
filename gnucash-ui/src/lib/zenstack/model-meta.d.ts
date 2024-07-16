declare const metadata: {
    models: {
        shelf: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                shortName: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                luggages: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                partOf: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isOptional: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                rackId: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                comment: {
                    name: string;
                    type: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
                shortName: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        rack: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                name: {
                    name: string;
                    type: string;
                };
                shortName: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                type: {
                    name: string;
                    type: string;
                };
                shelves: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                comment: {
                    name: string;
                    type: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
                shortName: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        luggage: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                name: {
                    name: string;
                    type: string;
                };
                comment: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                type: {
                    name: string;
                    type: string;
                };
                length: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                width: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                height: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                storedAt: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isOptional: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                shelfId: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        user: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                name: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                email: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                emailVerified: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                image: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                accounts: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                sessions: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                country_id: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                    isForeignKey: boolean;
                    relationField: string;
                };
                country: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isOptional: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                Authenticator: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                created_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                updated_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                footprint_id: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                    isForeignKey: boolean;
                    relationField: string;
                };
                carbonFootprint: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isOptional: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                space_id: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                space: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                api_key: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                comments: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                spaceSharing: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
                email: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        space: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                owner_id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    isForeignKey: boolean;
                    relationField: string;
                };
                name: {
                    name: string;
                    type: string;
                    isId: boolean;
                };
                is_system_space: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: {
                            value: boolean;
                        }[];
                    }[];
                };
                user: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                todos: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                spaceSharing: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
            };
            uniqueConstraints: {
                owner_id_name: {
                    name: string;
                    fields: string[];
                };
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        spaceSharing: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                space_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                space: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                user_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                user: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
                user_id_space_id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        account: {
            name: string;
            fields: {
                user_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                type: {
                    name: string;
                    type: string;
                };
                provider: {
                    name: string;
                    type: string;
                    isId: boolean;
                };
                provider_account_id: {
                    name: string;
                    type: string;
                    isId: boolean;
                };
                refresh_token: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                refresh_token_expires_in: {
                    name: string;
                    type: string;
                };
                access_token: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                expires_at: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                token_type: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                scope: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                id_token: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                session_state: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                created_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                updated_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                user: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
            };
            uniqueConstraints: {
                provider_provider_account_id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        session: {
            name: string;
            fields: {
                sessionToken: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                user_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                expires: {
                    name: string;
                    type: string;
                };
                user: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                created_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                updated_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
            };
            uniqueConstraints: {
                sessionToken: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        verificationToken: {
            name: string;
            fields: {
                identifier: {
                    name: string;
                    type: string;
                    isId: boolean;
                };
                token: {
                    name: string;
                    type: string;
                    isId: boolean;
                };
                expires: {
                    name: string;
                    type: string;
                };
            };
            uniqueConstraints: {
                identifier_token: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        authenticator: {
            name: string;
            fields: {
                credentialID: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                user_id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    isForeignKey: boolean;
                    relationField: string;
                };
                provider_account_id: {
                    name: string;
                    type: string;
                };
                credentialPublicKey: {
                    name: string;
                    type: string;
                };
                counter: {
                    name: string;
                    type: string;
                };
                credentialDeviceType: {
                    name: string;
                    type: string;
                };
                credentialBackedUp: {
                    name: string;
                    type: string;
                };
                transports: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                user: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
            };
            uniqueConstraints: {
                user_id_credentialID: {
                    name: string;
                    fields: string[];
                };
                credentialID: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        country: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                name: {
                    name: string;
                    type: string;
                };
                hdi: {
                    name: string;
                    type: string;
                };
                User: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        carbonFootprint: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                user_id: {
                    name: string;
                    type: string;
                };
                vehicles: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                User: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
                demographics: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isOptional: boolean;
                    backLink: string;
                };
                unit: {
                    name: string;
                    type: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        demographics: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                footprint_id: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isForeignKey: boolean;
                    relationField: string;
                };
                country: {
                    name: string;
                    type: string;
                };
                houseSize: {
                    name: string;
                    type: string;
                };
                householdIncome: {
                    name: string;
                    type: string;
                };
                footprint: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
                footprint_id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        emissionVehicles: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                name: {
                    name: string;
                    type: string;
                    isOptional: boolean;
                };
                mileage: {
                    name: string;
                    type: string;
                };
                milesPerYear: {
                    name: string;
                    type: string;
                };
                footprint_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                fuelType: {
                    name: string;
                    type: string;
                };
                footprint: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        todo: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                title: {
                    name: string;
                    type: string;
                };
                description: {
                    name: string;
                    type: string;
                };
                statusMetaId: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                statusMeta: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                space_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                space: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                created_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                updated_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                StatusTransitions: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        comment: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                user_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                user: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                commentable: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isOptional: boolean;
                    backLink: string;
                };
                comment: {
                    name: string;
                    type: string;
                };
                created_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        statusMeta: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                statuses: {
                    name: string;
                    type: string;
                };
                Todo: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    isArray: boolean;
                    backLink: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        statusTransitions: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                todo_id: {
                    name: string;
                    type: string;
                    isForeignKey: boolean;
                    relationField: string;
                };
                todo: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
                created_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                updated_at: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                };
                status: {
                    name: string;
                    type: string;
                };
                comment: {
                    name: string;
                    type: string;
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
        commentable: {
            name: string;
            fields: {
                id: {
                    name: string;
                    type: string;
                    isId: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isAutoIncrement: boolean;
                };
                commentee_type: {
                    name: string;
                    type: string;
                };
                commentee_id: {
                    name: string;
                    type: string;
                };
                comment_id: {
                    name: string;
                    type: string;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    isForeignKey: boolean;
                    relationField: string;
                };
                comment: {
                    name: string;
                    type: string;
                    isDataModel: boolean;
                    attributes: {
                        name: string;
                        args: never[];
                    }[];
                    backLink: string;
                    isRelationOwner: boolean;
                    foreignKeyMapping: {
                        id: string;
                    };
                };
            };
            uniqueConstraints: {
                id: {
                    name: string;
                    fields: string[];
                };
                comment_id: {
                    name: string;
                    fields: string[];
                };
            };
            attributes: {
                name: string;
                args: {
                    name: string;
                    value: string;
                }[];
            }[];
        };
    };
    deleteCascade: {
        user: string[];
        space: string[];
    };
    authModel: string;
};
export default metadata;
