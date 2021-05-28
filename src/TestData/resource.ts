export const resource = {
    'contract:status_date': '2022-05-05',
    'duration:renewal_month': 5,
    'contract:end_validity_date': '9999-99-99',
    'contract:proposition_status': null,
    '_links': {
        'curies': [
            {
                'templated': true,
                'name': 'contract',
                'href': '/rel/contract/{rel}'
            },
            {
                'templated': true,
                'name': 'cscaia',
                'href': '/rel/cscaia/{rel}'
            }
        ],
        'cscaia:output_documents': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/output_documents'
        },
        'contract:extension_list': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/extension_elements'
        },
        'cscaia:available_documents': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/available_documents'
        },
        'collection': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts'
        },
        'type': {
            'href': 'http://20.33.40.147:13111/csc/insurance/schemas/contracts/individualContractDocument'
        },
        'contract:membership_list-direct': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/risks'
        },
        'cscaia:states': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/states'
        },
        'via': {
            'name': 'Launch view activity in AIA',
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/launch_view_aia'
        },
        'contract:role_list': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/party_roles'
        },
        'cscaia:information_requests': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/information_requests'
        },
        'contract:billing_list': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/billings'
        },
        'cscaia:manual_tasks': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/manual_tasks'
        },
        'contract:operation_list-premium': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/premiums'
        },
        'contract:membership_list': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/risks'
        },
        'cscaia:activities': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/activities'
        },
        'cscaia:information_receipts': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/information_receipts'
        },
        'contract:questionnaire_list': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/questionnaires?_inquiry=e_contract_level_qstnnrs_all_types'
        },
        'contract:clause_list': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/clauses'
        },
        'cscaia:operations': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/operations'
        },
        'self': {
            'name': 'PC_MLTRSK/PCMR000381 : Mr Test Case CAR WITH TRAILER - In Force - Effective on 05/05/2022',
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu',
            'title': 'PC_MLTRSK/PCMR000381 : Mr Test Case CAR WITH TRAILER - In Force - Effective on 05/05/2022'
        },
        'up': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts'
        },
        'cscaia:activity_definitions': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/activity_definitions'
        },
        'cscaia:status_report': {
            'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/status_report'
        }
    },
    '_options': {
        'links': [
            {
                'method': 'GET',
                'rel': 'fetch-ci-contract-addtnl-info-rest',
                'mediaType': 'application/vnd.hal+json',
                'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu?_inquiry=ci_contract_addtnl_info_rest',
                'title': 'Fetch Contract details with inquiry ci_contract_addtnl_info_rest.'
            },
            {
                'method': 'GET',
                'rel': 'fetch',
                'mediaType': 'application/vnd.hal+json',
                'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu',
                'title': 'Fetch Contract details'
            }
        ],
        'title': 'Contract resource interactions',
        'properties': {
            'contract:status_date': {
                'format': 'date',
                'type': 'string'
            },
            'duration:renewal_month': {
                'maximum': 99,
                'type': 'integer'
            },
            'contract:end_validity_date': {
                'format': 'date',
                'type': 'string'
            },
            'tax_system:identifier_label': {
                'type': 'string',
                'maxLength': 200
            },
            'tax_system:option': {
                'type': 'string',
                'enum': [
                    'epargne_handicap',
                    'rente_de_survie'
                ]
            },
            '_embed': {
                'oneOf': [
                    {
                        'const': 'none'
                    },
                    {
                        'type': 'array',
                        'items': {
                            'type': 'string'
                        }
                    }
                ]
            },
            'contract:proposition_status': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'Deferred',
                        'enum': [
                            'deferred'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Not Taken Out',
                        'enum': [
                            'not_taken_out'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Rejected',
                        'enum': [
                            'rejected'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'To Transfer',
                        'enum': [
                            'to_transfer'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Transferred',
                        'enum': [
                            'transferred'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Under Review',
                        'enum': [
                            'under_review'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Waiting Acceptance',
                        'enum': [
                            'waiting_acceptance'
                        ]
                    }
                ],
                'type': 'string'
            },
            'contract:previous_number': {
                'type': 'string',
                'maxLength': 30
            },
            'contract:number': {
                'type': 'string',
                'maxLength': 30
            },
            'tax_system:start_date': {
                'format': 'date',
                'type': 'string'
            },
            'tax_system:residence': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'Non-resident',
                        'enum': [
                            'abroad'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Monaco',
                        'enum': [
                            'monaco'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Resident',
                        'enum': [
                            'resident'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Overseas country',
                        'enum': [
                            'tom'
                        ]
                    }
                ],
                'type': 'string'
            },
            'contract:end_date': {
                'format': 'date',
                'type': 'string'
            },
            'contract:marketing_product_number': {
                'type': 'string',
                'maxLength': 11
            },
            'contract:proposal_number': {
                'type': 'string',
                'maxLength': 30
            },
            'contract:product_identifier': {
                'type': 'string',
                'maxLength': 11
            },
            'contract:external_number': {
                'type': 'string',
                'maxLength': 30
            },
            'duration:value': {
                'maximum': 99999,
                'type': 'integer'
            },
            'contract:product_label': {
                'type': 'string',
                'maxLength': 60
            },
            'duration:renewal_day': {
                'maximum': 99,
                'type': 'integer'
            },
            'tax_system:tax_nature': {
                'type': 'string',
                'maxLength': 100
            },
            'contract:status_motive': {
                'oneOf': [
                    {
                        'description': 'language:n/a',
                        'title': 'cancelation',
                        'enum': [
                            'cancelation'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Claim',
                        'enum': [
                            'claim'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Client\u2019s Request',
                        'enum': [
                            'client_requested'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Membership Deferral',
                        'enum': [
                            'deferral_member'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'deferred',
                        'enum': [
                            'deferred'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Client deceased',
                        'enum': [
                            'deseased'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'End of risk',
                        'enum': [
                            'end_of_risk'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'End of risk coverage',
                        'enum': [
                            'end_of_risk_coverage'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Error in data entry',
                        'enum': [
                            'entry_data_error'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Expired',
                        'enum': [
                            'expired'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Input Error',
                        'enum': [
                            'input_error'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Insured Refusal',
                        'enum': [
                            'insured_rejected'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Membership Refusal',
                        'enum': [
                            'issue_rejected'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Awaiting Special Conditions',
                        'enum': [
                            'medical_decision'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Missing Deposit (O.N.)',
                        'enum': [
                            'missing_deposit'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Missing Deposit',
                        'enum': [
                            'missing_deposit_st'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'No Longer Insured',
                        'enum': [
                            'no_longer_insured'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'None',
                        'enum': [
                            'none'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Not Taken Out',
                        'enum': [
                            'not_taken_out'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Official Notice',
                        'enum': [
                            'official_notice'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Other',
                        'enum': [
                            'other'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Paid-Up',
                        'enum': [
                            'paid_up'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Replacement',
                        'enum': [
                            'replacement'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Insurer\u2019s Decision',
                        'enum': [
                            'requested_by_insurer'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Returned Check',
                        'enum': [
                            'returned_check'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Risk increase',
                        'enum': [
                            'risk_increase'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Sale/Legal recovery',
                        'enum': [
                            'sale_recovery'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Deduction/Surrender/Withdrawal',
                        'enum': [
                            'surrender'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'suspended',
                        'enum': [
                            'suspended'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Transfer',
                        'enum': [
                            'transfer'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Non-Payment',
                        'enum': [
                            'unpaid'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Unsettled',
                        'enum': [
                            'unsettled'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Withdrawal',
                        'enum': [
                            'withdrawal'
                        ]
                    }
                ],
                'type': 'string'
            },
            'tax_system:identifier': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'Contract: "Farmers"',
                        'enum': [
                            'agriculteurs'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Contract: "Article 83"',
                        'enum': [
                            'article_83'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'bon_capitalisation_dsk',
                        'enum': [
                            'bon_capitalisation_dsk'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'bon_capitalisation_standard',
                        'enum': [
                            'bon_capitalisation_standard'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'capitalisation_dsk',
                        'enum': [
                            'capitalisation_dsk'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'capitalisation_standard',
                        'enum': [
                            'capitalisation_standard'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'dsk',
                        'enum': [
                            'dsk'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'fourgous',
                        'enum': [
                            'fourgous'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Contract specification Life generation',
                        'enum': [
                            'life_generation'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'loi_madelin',
                        'enum': [
                            'loi_madelin'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'loi_madelin_agriculteur',
                        'enum': [
                            'loi_madelin_agriculteur'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'mono_fond',
                        'enum': [
                            'mono_fond'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'pea',
                        'enum': [
                            'pea'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'pep',
                        'enum': [
                            'pep'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'pep_fourgous',
                        'enum': [
                            'pep_fourgous'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Contract: "Retirement Savings Plan"',
                        'enum': [
                            'per'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Contract: "Savings plan for group retirement"',
                        'enum': [
                            'perco'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'perp',
                        'enum': [
                            'perp'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Group Risk & Protection',
                        'enum': [
                            'prevoyance_collective'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Open Group / Madelin Risk & Protection',
                        'enum': [
                            'prevoyance_madelin'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Individual Risk & Protection',
                        'enum': [
                            'prevoyance_standard'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Group Health',
                        'enum': [
                            'sante_collective'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Open Group / Madelin Health',
                        'enum': [
                            'sante_madelin'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Individual Health',
                        'enum': [
                            'sante_standard'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'unite_de_compte',
                        'enum': [
                            'unite_de_compte'
                        ]
                    }
                ],
                'type': 'string'
            },
            'contract:renewal_date': {
                'format': 'date',
                'type': 'string'
            },
            'total_fees': {
                'maximum': 999.99E0,
                'type': 'number'
            },
            'contract:status': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'Cancelled',
                        'enum': [
                            'cancelled'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Formal Request',
                        'enum': [
                            'formal_request'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'In Force',
                        'enum': [
                            'in_force'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Not issued',
                        'enum': [
                            'not_issued'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Not Taken Out',
                        'enum': [
                            'not_taken_out'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Not Taken Up',
                        'enum': [
                            'not_taken_up'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'On Expiry',
                        'enum': [
                            'on_expiry'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Paid-up',
                        'enum': [
                            'paid_up'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Proposition',
                        'enum': [
                            'proposition'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Proposition Rejected',
                        'enum': [
                            'proposition_rejected'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Expired',
                        'enum': [
                            'regular_premium'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Replaced',
                        'enum': [
                            'replaced'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Surrendered',
                        'enum': [
                            'surrender'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Suspended',
                        'enum': [
                            'suspended'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Transferred',
                        'enum': [
                            'transferred'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Unsettled',
                        'enum': [
                            'unsettled'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Waiting Certification',
                        'enum': [
                            'waiting_certification'
                        ]
                    }
                ],
                'type': 'string'
            },
            'contract:nature': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'Additional',
                        'enum': [
                            'additional'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Base',
                        'enum': [
                            'base'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Base + Supplementary cover',
                        'enum': [
                            'base_supplementary'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Family extension',
                        'enum': [
                            'family'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Incidental',
                        'enum': [
                            'incidental'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Supplementary cover',
                        'enum': [
                            'supplementary'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Supplementary cover + Family extension',
                        'enum': [
                            'supplementary_family'
                        ]
                    }
                ],
                'type': 'string'
            },
            'contract:language': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'English (AUS)',
                        'enum': [
                            'aus_english'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Austrian',
                        'enum': [
                            'austrian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'French (Belgian)',
                        'enum': [
                            'belgian_french'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Portuguese (Brazil)',
                        'enum': [
                            'brazil_portuguese'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Bulgarian',
                        'enum': [
                            'bulgarian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Czech',
                        'enum': [
                            'czech'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Danish',
                        'enum': [
                            'danish'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Dutch',
                        'enum': [
                            'dutch'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'english',
                        'enum': [
                            'english'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Finnish',
                        'enum': [
                            'finnish'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Flemish',
                        'enum': [
                            'flemish'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'French',
                        'enum': [
                            'french'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'German',
                        'enum': [
                            'german'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Greek',
                        'enum': [
                            'greek'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Hungarian',
                        'enum': [
                            'hungarian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Italian',
                        'enum': [
                            'italian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Japanese',
                        'enum': [
                            'japanese'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Korean',
                        'enum': [
                            'korean'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Norwegian',
                        'enum': [
                            'norwegian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Polish',
                        'enum': [
                            'polish'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Portuguese',
                        'enum': [
                            'portuguese'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Romanian',
                        'enum': [
                            'romanian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Russian',
                        'enum': [
                            'russian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Simplified Chinese',
                        'enum': [
                            'simpl_chinese'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Slovak',
                        'enum': [
                            'slovakian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Spanish',
                        'enum': [
                            'spanish'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Swedish',
                        'enum': [
                            'swedish'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'English (Swiss)',
                        'enum': [
                            'swiss_english'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'French (Swiss)',
                        'enum': [
                            'swiss_french'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'German (Swiss)',
                        'enum': [
                            'swiss_german'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Italian (Swiss)',
                        'enum': [
                            'swiss_italian'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Thai',
                        'enum': [
                            'thai'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Traditional Chinese',
                        'enum': [
                            'trad_chinese'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Turkish',
                        'enum': [
                            'turkish'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'English',
                        'enum': [
                            'uk_english'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'English (U.S.)',
                        'enum': [
                            'us_english'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Vietnamese',
                        'enum': [
                            'vietnamese'
                        ]
                    }
                ],
                'type': 'string'
            },
            'tax_system:residence_label': {
                'type': 'string',
                'maxLength': 150
            },
            'indexation:active': {
                'type': 'boolean'
            },
            'loan_account:total_amount_due': {
                'maximum': 999999999999.99E0,
                'type': 'number'
            },
            'contract:currency_code': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'BEF',
                        'enum': [
                            'bef'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'CHF',
                        'enum': [
                            'chf'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'czk',
                        'enum': [
                            'czk'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'DEM',
                        'enum': [
                            'dem'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'EUR',
                        'enum': [
                            'eur'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'FRF',
                        'enum': [
                            'frf'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'GBP',
                        'enum': [
                            'gbp'
                        ]
                    },
                    {
                        'description': 'language:n/a',
                        'title': 'huf',
                        'enum': [
                            'huf'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'ITL',
                        'enum': [
                            'itl'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'LUF',
                        'enum': [
                            'luf'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'RUB',
                        'enum': [
                            'rub'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'RUR',
                        'enum': [
                            'rur'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'SEK',
                        'enum': [
                            'sek'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'USD',
                        'enum': [
                            'usd'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'XEV',
                        'enum': [
                            'xev'
                        ]
                    }
                ],
                'type': 'string'
            },
            'contract:signature_date': {
                'format': 'date',
                'type': 'string'
            },
            'contract:start_date': {
                'format': 'date',
                'type': 'string'
            },
            'contract:nature_label': {
                'type': 'string',
                'maxLength': 150
            },
            'contract:product_type': {
                'oneOf': [
                    {
                        'description': 'language:en-GB',
                        'title': 'Vehicles',
                        'enum': [
                            'auto'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Health',
                        'enum': [
                            'health'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Life',
                        'enum': [
                            'life'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Others',
                        'enum': [
                            'miscellaneous'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Multi-risks',
                        'enum': [
                            'multi_risk'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Pension',
                        'enum': [
                            'pension'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Residential',
                        'enum': [
                            'property'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Term Insurance',
                        'enum': [
                            'risk_protection'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Savings',
                        'enum': [
                            'savings'
                        ]
                    },
                    {
                        'description': 'language:en-GB',
                        'title': 'Standard',
                        'enum': [
                            'standard'
                        ]
                    }
                ],
                'type': 'string'
            }
        }
    },
    'contract:previous_number': '',
    'contract:number': 'PCMR000381',
    'contract:end_date': '9999-99-99',
    'contract:marketing_product_number': 'PC_MLTRSK',
    '_embedded': {
        'cscaia:status_report': {
            '_links': {
                'self': {
                    'name': 'status_report',
                    'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/status_report',
                    'title': 'status_report'
                },
                'up': {
                    'href': 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu'
                },
                'type': {
                    'href': 'http://20.33.40.147:13111/csc/insurance/schemas/contracts/statusReportDocument'
                }
            },
            'messages': null,
            'consistent': true
        }
    },
    'contract:proposal_number': 'PCMR000381',
    'contract:external_number': null,
    'contract:product_identifier': 'PC_MLTRSK',
    'duration:value': 999,
    'contract:product_label': 'Multi risk multi type risk for individuals',
    'duration:renewal_day': 1,
    'contract:status_motive': 'none',
    'contract:renewal_date': '2022-05-01',
    'total_fees': 0,
    'contract:status': 'not_issued',
    'contract:nature': null,
    'contract:language': 'french',
    'contract:currency_code': 'eur',
    'contract:signature_date': '2021-05-05',
    'contract:start_date': '2022-05-05',
    'contract:nature_label': null,
    'contract:product_type': 'multi_risk'
};