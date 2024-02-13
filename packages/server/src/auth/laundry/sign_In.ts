
const { email, password } = req.body;

try {
    const companyData = await prisma.company.findUnique({
        where: {
            email,
        },
        include: {
            cmpRefreshToken: true,
        },
    });

    if (!companyData) {

        return res.status(400).json({
            status: "error",
            message: "Invalid email or password",
        });
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        companyData.password
    );

    if (!isPasswordMatch) {
        return res.status(400).json({
            status: "error",
            message: "Invalid email or password",
        });
    }

    const val = isRefreshTokenExpired(companyData?.cmpRefreshToken[0].token);

    if (val) {
        const gen = generateNewAccessToken(companyData?.cmpRefreshToken[0].token);
        res.status(200).json({
            status: "success",
            ...companyData,
            accessToken: gen,
        });

    }

    //        if (val) {
    //            const accessToken = createAccessToken(
    //                {
    //                    id: companyData.id,
    //                    email: companyData.email,
    //                    company_name: companyData.name,
    //                },
    //                companyData.id
    //            );
    //
    //            res
    //                .status(200)
    //                .header("Authorization", "Bearer" + accessToken)
    //                .json({
    //                    status: "success",
    //                    ...companyData,
    //                });
    //        } else {
    //            res.status(400).json({
    //                status: "error",
    //                message: "Invalid email or password",
    //            });
    //        }


} catch (err) {
    console.error(err);
    next(err);
}
};

